package repo

import (
	"database/sql"
	"errors"
	"log"
	"time"
)

type EmailVerification struct {
	ID        int       `json:"id"`
	Email     string    `json:"email"`
	OTP       string    `json:"otp"`
	ExpiresAt time.Time `json:"expires_at"`
}

type EmailVerificationRepo interface {
	SaveOTP(email, otp string, expiry time.Time) error
	VerifyOTP(email, otp string) (bool, error)
	DeleteOTP(email string) error
}

type emailVerificationRepo struct {
	dbCon *sql.DB
}

// NewEmailVerificationRepo creates a new EmailVerificationRepo
func NewEmailVerificationRepo(dbCon *sql.DB) EmailVerificationRepo {
	return &emailVerificationRepo{dbCon: dbCon}
}

// SaveOTP stores a new OTP or updates if already exists
func (r *emailVerificationRepo) SaveOTP(email, otp string, expiry time.Time) error {
	query := `
        INSERT INTO email_verification (email, otp, expires_at)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE otp = VALUES(otp), expires_at = VALUES(expires_at)
    `
	res, err := r.dbCon.Exec(query, email, otp, expiry)
	if err != nil {
		log.Printf("SaveOTP Exec failed: email=%s otp=%s expiry=%v error=%v\n", email, otp, expiry, err)
		return err
	}

	rows, _ := res.RowsAffected()
	log.Println("SaveOTP rows affected:", rows)
	return nil
}

// VerifyOTP checks if the OTP is correct and not expired
func (r *emailVerificationRepo) VerifyOTP(email, otp string) (bool, error) {
	query := `
		SELECT otp, expires_at
		FROM email_verification
		WHERE email = ?
		LIMIT 1
	`

	var storedOTP string
	var expiresAt time.Time

	err := r.dbCon.QueryRow(query, email).Scan(&storedOTP, &expiresAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, errors.New("no OTP found for this email")
		}
		return false, err
	}

	if storedOTP != otp {
		return false, errors.New("invalid OTP")
	}

	if time.Now().After(expiresAt) {
		return false, errors.New("OTP expired")
	}

	return true, nil
}

// DeleteOTP removes OTP after successful verification
func (r *emailVerificationRepo) DeleteOTP(email string) error {
	_, err := r.dbCon.Exec("DELETE FROM email_verification WHERE email = ?", email)
	return err
}
