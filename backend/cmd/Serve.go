package cmd

import (
	"fmt"
	"net/http"
	"os"
	"plan2go-backend/config"
	"plan2go-backend/rest"
	"plan2go-backend/rest/middleware"
	"plan2go-backend/util"
	"strconv"
)

func Serve() {
	
	cnf:=config.GetConfig()
		manager := middleware.NewManager()
	manager.Use(middleware.Logger)

	mux := http.NewServeMux()
	rest.InitRoutes(mux, manager)

	adrr := ":" + strconv.Itoa(cnf.HttpPort)
	fmt.Println("Server is running on port", adrr)
	err := http.ListenAndServe(adrr, util.GlobalRouter(mux))
	if err != nil {
		fmt.Println("Error starting server:", err)
		os.Exit(1)
	}
	
}
