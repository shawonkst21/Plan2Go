package user

import (
	"plan2go-backend/repo"
	"plan2go-backend/rest/middleware"
)

type Handler struct {
	cnfMiddleWare middleware.ConfigMiddleware
	userRepo repo.UserRepo
}

func NewHandler(cnf middleware.ConfigMiddleware, userRepo repo.UserRepo) *Handler {
	return &Handler{
		cnfMiddleWare: cnf,
		userRepo: userRepo,
	}
}
