package rest

import (
	"fmt"
	"net/http"
	"os"
	"plan2go-backend/config"
	"plan2go-backend/rest/handlers/user"
	"plan2go-backend/rest/middleware"
	"plan2go-backend/util"
	"strconv"
)
type Server struct {
	cnf *config.Config
	userHandler *user.Handler
	
}
func NewServer(cnf *config.Config, userHandler *user.Handler) *Server {
	return &Server{
		cnf: cnf,
		userHandler: userHandler,
	}
}
	
func (server *Server) Start() {
	manager := middleware.NewManager()
	manager.Use(middleware.Logger)
	mux := http.NewServeMux()
	
	server.userHandler.RegisterRoutes(mux,manager)

	adrr := ":" + strconv.Itoa(server.cnf.HttpPort)
	fmt.Println("Server is running on port", adrr)
	err := http.ListenAndServe(adrr, util.GlobalRouter(mux))
	if err != nil {
		fmt.Println("Error starting server:", err)
		os.Exit(1)
	}
}