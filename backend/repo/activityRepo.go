package repo

import (
	"database/sql"
	"plan2go-backend/models"
)

type ActivityRepo struct {
    DB *sql.DB
}

func NewActivityRepo(db *sql.DB) *ActivityRepo {
    return &ActivityRepo{DB: db}
}

func (r *ActivityRepo) CreateActivity(a models.Activity) error {
    query := `
        INSERT INTO user_activity (user_id, activity_type, description)
        VALUES (?, ?, ?)
    `
    _, err := r.DB.Exec(query, a.UserID, a.Action, a.Description)
    return err
}

