package user

import (
	"net/http"
	"plan2go-backend/config"
	"plan2go-backend/util"
)

func (h *Handler) ResendOTP(w http.ResponseWriter, r *http.Request) {
	// 1. Get JWT from Authorization header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	tokenString := authHeader
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		tokenString = authHeader[7:]
	}

	// 2. Verify token and extract claims
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

	// 3. Fetch OTP from database
	otp, err := h.emailRepo.FetchOTP(email)
	if err != nil {
		util.SendData(w, map[string]interface{}{
			"success": false,
			"error":   "No OTP found for this email",
		}, http.StatusNotFound)
		return
	}

	// 4. Send OTP via email
	err = util.SendOTPEmail(email, otp)
	if err != nil {
		util.SendData(w, map[string]interface{}{
			"success": false,
			"error":   "Failed to send OTP email",
		}, http.StatusInternalServerError)
		return
	}

	// 5. Respond success
	util.SendData(w, map[string]interface{}{
		"success": true,
		"message": "OTP sent successfully",
	}, http.StatusOK)
}
