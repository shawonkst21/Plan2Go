package main

import (
	"plan2go-backend/cmd"
)

func main() {
	database.ConnectDB()
	cmd.Serve()
}