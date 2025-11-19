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
