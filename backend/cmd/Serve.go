package cmd

import (
	"fmt"
	"os"
	"plan2go-backend/config"
	db "plan2go-backend/infra/DB"
	"plan2go-backend/repo"
	"plan2go-backend/rest"
	"plan2go-backend/rest/handlers/user"
	"plan2go-backend/rest/handlers/weather"
	"plan2go-backend/rest/middleware"
)

func Serve() {
    dbcn,err:=db.ConnectDB()
	if err!=nil{
		fmt.Println(err)
		os.Exit(1)
	}
		userRepo:=repo.NewUserRepo(dbcn)

	cnf := config.GetConfig()
	cnfMiddleWare:=middleware.NewConfigMiddleware(cnf)
	userhandler:=user.NewHandler(*cnfMiddleWare,userRepo)
	weatherHandler:=weather.NewHandler()

	
	server:=rest.NewServer(cnf, userhandler,weatherHandler)
	server.Start()
	
}
