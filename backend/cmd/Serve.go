package cmd

import (
	"fmt"
	"net/http"
	"plan2go-backend/middleware"
	"plan2go-backend/util"
)

func Serve() {
	manager := middleware.NewManager()
	manager.Use(middleware.Logger)

	mux := http.NewServeMux()
	InitRoutes(mux, manager)

	fmt.Println("Server is running on port 8080")
	err := http.ListenAndServe(":8080", util.GlobalRouter(mux))
	if err != nil {
		fmt.Println("Error starting server:", err)
	}

}
