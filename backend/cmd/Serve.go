package cmd

import (
	"plan2go-backend/config"
	"plan2go-backend/rest"
)

func Serve() {

	cnf := config.GetConfig()
	rest.Start(cnf)
}
