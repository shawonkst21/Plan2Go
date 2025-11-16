package user

import (
	"encoding/json"
	"net/http"
	"plan2go-backend/config"
	"plan2go-backend/util"
)

type changePasswordReq struct {
	OldPassword string `json:"oldPassword"`
	NewPassword string `json:"newPassword"`
}

func (h *Handler) ChangePassword(w http.ResponseWriter, r *http.Request) {

	// 1. Read JWT header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	tokenString := authHeader
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		tokenString = authHeader[7:]
	}

	// 2. Validate JWT
	cnf := config.GetConfig()
	claims, err := util.VerifyToken(tokenString, cnf.Jwt_SecretKey)
	if err != nil {
		http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
		return
	}

	email := claims.Email
	if email == "" {
		http.Error(w, "Token missing email", http.StatusUnauthorized)
		return
	}

	// 3. Decode old + new passwords
	var req changePasswordReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.OldPassword == "" || req.NewPassword == "" {
		http.Error(w, "Old and new password required", http.StatusBadRequest)
		return
	}

	// 4. Get stored hashed password
	storedPassword, err := h.userRepo.GetUserPassword(email)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	if storedPassword == "" {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// 5. Compare old password with stored hash
	if !util.CheckPasswordHash(req.OldPassword, storedPassword) {
		http.Error(w, "Old password incorrect", http.StatusUnauthorized)
		return
	}

	// 6. Hash new password
	newHashedPassword, err := util.HashPassword(req.NewPassword)
	if err != nil {
		http.Error(w, "Error hashing new password", http.StatusInternalServerError)
		return
	}

	// 7. Update password in DB
	_, err = h.userRepo.UpdatePassword(email, newHashedPassword)
	if err != nil {
		http.Error(w, "Failed to update password", http.StatusInternalServerError)
		return
	}

	util.SendData(w, map[string]string{
		"message": "Password changed successfully",
	}, http.StatusOK)
}
