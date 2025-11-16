package user

import (
	"encoding/json"
	"net/http"
	"plan2go-backend/config"
	"plan2go-backend/repo"
	"plan2go-backend/util"
)

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user repo.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Hash password
	hashedPassword, err := util.HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}
	user.Password = hashedPassword

	// Use the repository to create user
	createdUser, err :=h.userRepo.CreateUser(user)
	if err != nil {
		http.Error(w, "User already exists or DB error", http.StatusConflict)
		return
	}

	// Generate token
	cnf := config.GetConfig()
	token, _ := util.GenerateToken(cnf.Jwt_SecretKey, createdUser.ID, createdUser.Username)

	util.SendData(w, map[string]string{"token": token}, http.StatusCreated)
}
