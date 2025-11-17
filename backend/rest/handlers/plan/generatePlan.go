package plan

import (
	"encoding/json"
	"net/http"
)

type PlanRequest struct {
    District string `json:"district"`
    Days     int    `json:"days"`
}



func (h *PlanHandler) GeneratePlan(w http.ResponseWriter, r *http.Request) {
    var req PlanRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    if req.District == "" || req.Days <= 0 {
        http.Error(w, "Invalid district or days", http.StatusBadRequest)
        return
    }

    plan, err := h.planService.GenerateTourPlan(r.Context(), req.District, req.Days)
    if err != nil {
        http.Error(w, "Failed to generate plan: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(plan)
}
