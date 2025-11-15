package handlers

import (
	"net/http"
	"plan2go-backend/util"
)

func CreateProducts(w http.ResponseWriter, r *http.Request) {
	util.SendData(w, map[string]string{"this is a placeholder": "this is working"}, http.StatusAccepted)
}