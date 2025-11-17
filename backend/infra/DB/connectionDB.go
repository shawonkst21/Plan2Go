package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDB() (*sql.DB, error) {
	// Format: username:password@tcp(host:port)/database_name
	dsn := "plan2go:12345@tcp(10.100.94.34:3306)/plan2go"

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error creating DB handle:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}

	fmt.Println("Connected to MySQL Database successfully! 🟢")
	return DB, nil
}
