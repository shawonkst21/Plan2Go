package user

import (
	"encoding/json"
	"net/http"
	"plan2go-backend/config"
	"plan2go-backend/database"
	"plan2go-backend/util"
)

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Register user
func (h *Handler) CreateUsers(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Hash password
	hashedPassword, _ := util.HashPassword(user.Password)

	// Insert in DB
	query := "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
	result, err := database.DB.Exec(query, user.Username, user.Email, hashedPassword)
	if err != nil {
		http.Error(w, "User already exists", http.StatusConflict)
		return
	}

	userID, _ := result.LastInsertId()

	// Generate token
	cnf := config.GetConfig()
	token, _ := util.GenerateToken(cnf.Jwt_SecretKey, int(userID), user.Username)

	util.SendData(w, map[string]string{"token": token}, http.StatusCreated)
}
