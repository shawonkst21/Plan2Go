package repo

import (
	"database/sql"
)

type Guide struct {
	GuideID         int     `json:"guide_id"`
	UserID          int     `json:"user_id"`
	City            string  `json:"city"`
	HourlyFee       float64 `json:"hourly_fee"`
	Rating          float64 `json:"rating"`
	Languages       string  `json:"languages"`
	ExperienceYears int     `json:"experience_years"`
	Bio             string  `json:"bio"`
	Available       bool    `json:"available"`
}

type GuideRepo interface {
	GetGuidesByCity(city string) ([]Guide, error)
	CreateGuide(g Guide) (*Guide, error)
}

type guideRepo struct {
	dbCon *sql.DB
}

func NewGuideRepo(dbCon *sql.DB) GuideRepo {
	return &guideRepo{
		dbCon: dbCon,
	}
}

// Get all guides operating in a specific city
func (r *guideRepo) GetGuidesByCity(city string) ([]Guide, error) {
	query := `
		SELECT guide_id, user_id, city, hourly_fee, rating, languages, experience_years, bio, available
		FROM guide
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
			&g.GuideID,
			&g.UserID,
			&g.City,
			&g.HourlyFee,
			&g.Rating,
			&g.Languages,
			&g.ExperienceYears,
			&g.Bio,
			&g.Available,
		)
		if err != nil {
			return nil, err
		}
		guides = append(guides, g)
	}

	return guides, nil
}

func (r *guideRepo) CreateGuide(g Guide) (*Guide, error) {
	query := `
		INSERT INTO guide 
		(user_id, city, hourly_fee, rating, languages, experience_years, bio, available, created_at, updated_at)
		VALUES (?, ?, ?, 0, ?, ?, ?, true, NOW(), NOW())
	`
	result, err := r.dbCon.Exec(query, g.UserID, g.City, g.HourlyFee, g.Languages, g.ExperienceYears, g.Bio)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	g.GuideID = int(id)
	g.Rating = 0
	g.Available = true
	return &g, nil
}
