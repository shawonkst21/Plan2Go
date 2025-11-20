package services

import (
	"plan2go-backend/models"
	"plan2go-backend/repo"
)

type ActivityService struct {
    Repo *repo.ActivityRepo
}

func NewActivityService(r *repo.ActivityRepo) *ActivityService {
    return &ActivityService{Repo: r}
}

func (s *ActivityService) TrackActivity(userID int, action, description string) error {
    activity := models.Activity{
        UserID:      userID,
        Action:      action,
        Description: description,
    }
    return s.Repo.CreateActivity(activity)
}
