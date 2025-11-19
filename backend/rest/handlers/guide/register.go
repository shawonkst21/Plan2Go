package guide

import (
	"encoding/json"
	"net/http"
	"plan2go-backend/repo"
	"plan2go-backend/util"
)

func (h *GuideHandler) CreateGuide(w http.ResponseWriter, r *http.Request) {
	var guide repo.Guide

	// Decode JSON
	if err := json.NewDecoder(r.Body).Decode(&guide); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if  guide.City == "" || guide.HourlyFee <= 0 {
		http.Error(w, "Missing required fields: city, hourly_fee", http.StatusBadRequest)
		return
	}

	// Insert guide via repo
	createdGuide, err := h.guideRepo.CreateGuide(guide)
	if err != nil {
		http.Error(w, "Guide already exists or DB error: "+err.Error(), http.StatusConflict)
		return
	}

	// Send response
	util.SendData(w, map[string]interface{}{
		"message": "Guide created successfully",
		"guide":   createdGuide,
	}, http.StatusCreated)
}
