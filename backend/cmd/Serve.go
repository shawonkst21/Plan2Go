package cmd

import (
	"plan2go-backend/config"
	"plan2go-backend/rest"
	"plan2go-backend/rest/handlers/user"
	"plan2go-backend/rest/middleware"
)

func Serve() {

	cnf := config.GetConfig()
	cnfMiddleWare:=middleware.NewConfigMiddleware(cnf)
	userhandler:=user.NewHandler(*cnfMiddleWare)
	
	server:=rest.NewServer(cnf, userhandler)
	server.Start()
	
}
