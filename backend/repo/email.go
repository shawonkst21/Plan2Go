package repo

import (
	"database/sql"
	"errors"
	"log"
)

type EmailVerificationRepo interface {
	SaveOTP(email, otp string) error
	VerifyOTP(email, otp string) (bool, error)
	DeleteOTP(email string) error
}

type emailVerificationRepo struct {
	dbCon *sql.DB
}

func NewEmailVerificationRepo(dbCon *sql.DB) EmailVerificationRepo {
	return &emailVerificationRepo{dbCon: dbCon}
}

// SaveOTP stores a new OTP or updates if already exists
func (r *emailVerificationRepo) SaveOTP(email, otp string) error {
	query := `
		INSERT INTO email_verification (email, otp)
		VALUES (?, ?)
		ON DUPLICATE KEY UPDATE otp = VALUES(otp)
	`
	res, err := r.dbCon.Exec(query, email, otp)
	if err != nil {
		log.Printf("SaveOTP Exec failed: email=%s otp=%s error=%v\n", email, otp, err)
		return err
	}

	rows, _ := res.RowsAffected()
	log.Println("SaveOTP rows affected:", rows)
	return nil
}

// VerifyOTP checks if the OTP is correct
func (r *emailVerificationRepo) VerifyOTP(email, otp string) (bool, error) {
	query := `
		SELECT otp
		FROM email_verification
		WHERE email = ?
		LIMIT 1
	`

	var storedOTP string
	err := r.dbCon.QueryRow(query, email).Scan(&storedOTP)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, errors.New("no OTP found for this email")
		}
		return false, err
	}

	if storedOTP != otp {
		return false, errors.New("invalid OTP")
	}

	return true, nil
}

// DeleteOTP removes OTP after successful verification
func (r *emailVerificationRepo) DeleteOTP(email string) error {
	_, err := r.dbCon.Exec("DELETE FROM email_verification WHERE email = ?", email)
	return err
}
