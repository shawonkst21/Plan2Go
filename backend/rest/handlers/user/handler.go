package user

import "plan2go-backend/rest/middleware"

type Handler struct {
	cnfMiddleWare middleware.ConfigMiddleware
}

func NewHandler(cnf middleware.ConfigMiddleware) *Handler {
	return &Handler{
		cnfMiddleWare: cnf,
	}
}
