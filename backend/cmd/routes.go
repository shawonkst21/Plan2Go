package cmd

import (
	"net/http"
	"plan2go-backend/handlers"
	"plan2go-backend/middleware"
)

func InitRoutes(mux *http.ServeMux, manager *middleware.Manager){
	
	mux.Handle(
		"GET /shawon",
		manager.With(
			http.HandlerFunc(handlers.Test),
		),
	)
}