package handlers

import (
	"fmt"
	"net/http"
)

func Test(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ami pore print hobo")
}