package repo

import (
	"database/sql"
	"time"
)

type Guide struct {
    ID                int       `json:"id"`
    UserID            int       `json:"user_id"`
    City              string    `json:"city"`
    HourlyFee         float64   `json:"hourly_fee"`
    Languages         string    `json:"languages"`
    YearsOfExperience int       `json:"years_of_experience"`
    CreatedAt         time.Time `json:"created_at"`
    UpdatedAt         time.Time `json:"updated_at"`
}

type GuideRepo interface {
	GetGuidesByCity(city string) ([]Guide, error)
	CreateGuide(g Guide) (*Guide, error)
}

type guideRepo struct {
	dbCon *sql.DB
}

func NewGuideRepo(dbCon *sql.DB) GuideRepo {
	return &guideRepo{dbCon: dbCon}
}

// Get all guides operating in a specific city
func (r *guideRepo) GetGuidesByCity(city string) ([]Guide, error) {
	query := `
		SELECT id, user_id, city, hourly_fee, languages, years_of_experience, created_at, updated_at
		FROM guides
		WHERE city = ?
	`

	rows, err := r.dbCon.Query(query, city)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var guides []Guide
	for rows.Next() {
		var g Guide
		err := rows.Scan(
			&g.ID,
			&g.UserID,
			&g.City,
			&g.HourlyFee,
			&g.Languages,
			&g.YearsOfExperience,
			&g.CreatedAt,
			&g.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		guides = append(guides, g)
	}

	return guides, nil
}

// Create a new guide
func (r *guideRepo) CreateGuide(g Guide) (*Guide, error) {
	query := `
		INSERT INTO guides (user_id, city, hourly_fee, languages, years_of_experience, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, NOW(), NOW())
	`
	result, err := r.dbCon.Exec(query, g.UserID, g.City, g.HourlyFee, g.Languages, g.YearsOfExperience)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	g.ID = int(id)
	g.CreatedAt = time.Now()
	g.UpdatedAt = time.Now()

	return &g, nil
}