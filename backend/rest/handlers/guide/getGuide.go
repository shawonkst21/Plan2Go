package guide

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type GuidesRequest struct {
	City string `json:"city"`
}

// Handle fetching all guides in a city
func (h *GuideHandler) GetGuidesByCity(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hi")
	var req GuidesRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if req.City == "" {
		http.Error(w, "City is required", http.StatusBadRequest)
		return
	}

	guides, err := h.guideRepo.GetGuidesByCity(req.City)
	if err != nil {
		http.Error(w, "Failed to fetch guides: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(guides)
}
