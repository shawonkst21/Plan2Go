package rest

import (
	"net/http"
	"plan2go-backend/rest/handlers"
	"plan2go-backend/rest/middleware"
)

func InitRoutes(mux *http.ServeMux, manager *middleware.Manager){
	
	mux.Handle(
		"GET /shawon",
		manager.With(
			http.HandlerFunc(handlers.Test),
		),
	)
}