package cmd

import (
	"context"
	"fmt"
	"log"
	"os"
	"plan2go-backend/config"
	db "plan2go-backend/infra/DB"
	"plan2go-backend/repo"
	"plan2go-backend/rest"
	"plan2go-backend/rest/handlers/plan"
	"plan2go-backend/rest/handlers/user"
	"plan2go-backend/rest/handlers/weather"
	"plan2go-backend/rest/middleware"
	"plan2go-backend/rest/services"

	"google.golang.org/genai"
)

func Serve() {
    dbcn,err:=db.ConnectDB()
	if err!=nil{
		fmt.Println(err)
		os.Exit(1)
	}
		userRepo:=repo.NewUserRepo(dbcn)

	cnf := config.GetConfig()
	//gemini servies
	ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
        APIKey: os.Getenv("GEMINI_API_KEY"),
    })
    if err != nil {
        log.Fatal(err)
    }
      planServices:=services.NewPlanService(client)
	  planHandler:=plan.NewPlanHandler(planServices)

	cnfMiddleWare:=middleware.NewConfigMiddleware(cnf)
	userhandler:=user.NewHandler(*cnfMiddleWare,userRepo)
	weatherHandler:=weather.NewHandler()

	server:=rest.NewServer(cnf, userhandler,weatherHandler, planHandler)
	server.Start()
	
}
