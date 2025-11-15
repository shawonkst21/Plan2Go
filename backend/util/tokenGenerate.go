package util

import (
	"plan2go-backend/config"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Claims structure (token payload)
type claims struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// GenerateToken creates a JWT token
func GenerateToken(jwtKey string, userID int, username string) (string, error) {
	expiration := time.Now().Add(24 * time.Hour)

	claims := &claims{
		UserID:   userID,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiration),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtKey))
}
// VerifyToken validates the JWT token
func VerifyToken(tokenString string) (*claims, error) {
	cnf := config.GetConfig()
	claims := &claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(cnf.Jwt_SecretKey), nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	return claims, nil
}

