package user

import (
	"encoding/json"
	"net/http"
	"plan2go-backend/config"
	db "plan2go-backend/infra/DB"
	"plan2go-backend/util"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	var storedPassword string

	// Only fetch email + password
	query := "SELECT password FROM users WHERE email = ?"
	err := db.DB.QueryRow(query, req.Email).Scan(&storedPassword)
	if err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	if !util.CheckPasswordHash(req.Password, storedPassword) {
		http.Error(w, "Wrong password", http.StatusUnauthorized)
		return
	}

	// Generate JWT using only email
	cnf := config.GetConfig()
	token, _ := util.GenerateToken(cnf.Jwt_SecretKey, req.Email)

	util.SendData(w, map[string]string{
		"message": "Login successful",
		"token": token}, http.StatusOK)
}

