package activity

import (
	"encoding/json"
	"net/http"
)

type TrackActivityRequest struct {
	UserID      int    `json:"user_id"`
	Action      string `json:"action"`
	Description string `json:"description"`
}

func (h *ActivityHandler) TrackActivity(w http.ResponseWriter, r *http.Request) {
	var req TrackActivityRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	err := h.Service.TrackActivity(req.UserID, req.Action, req.Description)
	if err != nil {
		http.Error(w, "Failed to save activity", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message": "activity saved"}`))
}
