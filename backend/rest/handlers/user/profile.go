package user

import (
	"net/http"
	"plan2go-backend/config"
	"plan2go-backend/util"
)

func (h *Handler) GetUserByEmail(w http.ResponseWriter, r *http.Request) {

	// 1. Read JWT from "Authorization" header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	// Expected format: Bearer <token>
	tokenString := authHeader
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		tokenString = authHeader[7:]
	}

	// 2. Verify and extract claims
	cnf := config.GetConfig()
	claims, err := util.VerifyToken(tokenString, cnf.Jwt_SecretKey)
	if err != nil {
		http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
		return
	}

	// 3. Extract email from JWT payload
	email := claims.Email
	if email == "" {
		http.Error(w, "Token missing email", http.StatusUnauthorized)
		return
	}

	// 4. Query database using email
	foundUser, err := h.userRepo.GetUserByEmail(email)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if foundUser == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// 5. Send user info back
	util.SendData(w, foundUser, http.StatusOK)
}
