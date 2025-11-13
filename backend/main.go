package main

import (
	"plan2go-backend/cmd"
	"plan2go-backend/database"
)

func main() {
	database.ConnectDB()
	cmd.Serve()
}
