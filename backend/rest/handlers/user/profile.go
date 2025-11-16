package user

import (
	"encoding/json"
	"net/http"
	"plan2go-backend/config"
	"plan2go-backend/util"
)

type emailRequest struct {
	Email string `json:"email"`
}

func (h *Handler) GetUserByEmail(w http.ResponseWriter, r *http.Request) {
	var req emailRequest

	// Decode request body
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Get user from repository
	foundUser, err := h.userRepo.GetUserByEmail(req.Email)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if foundUser == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// OPTIONAL: Generate token (if this is login)
	cnf := config.GetConfig()
	token, _ := util.GenerateToken(cnf.Jwt_SecretKey, foundUser.Email)
	// Return user + token
	util.SendData(w, map[string]interface{}{
		"user":  foundUser,
		"token": token,
	}, http.StatusOK)
}
