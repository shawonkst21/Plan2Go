package services

import (
    "context"
    "encoding/json"
    "fmt"

    "google.golang.org/genai"
)

type PlanService struct {
    client *genai.Client
}

func NewPlanService(client *genai.Client) *PlanService {
    return &PlanService{client: client}
}

func (p *PlanService) GenerateTourPlan(ctx context.Context, district string, days int) (map[string]interface{}, error) {
    prompt := fmt.Sprintf(`
You are a Bangladesh tour planning AI.
User selected district: %s.
User wants: %d days trip.

Return ONLY JSON. NO explanation.
JSON Format:
{
  "district": "",
  "total_days": 0,
  "itinerary": [
    {
      "day": 1,
      "places": [],
      "food": []
    }
  ],
  "estimated_budget": "",
  "accessories": []
}
`, district, days)

    result, err := p.client.Models.GenerateContent(
        ctx,
        "gemini-2.0-flash",
        genai.Text(prompt),
        &genai.GenerateContentConfig{
            ResponseMIMEType: "application/json",
        },
    )
    if err != nil {
        return nil, err
    }

    jsonText := result.Text()
    var output map[string]interface{}
    if err := json.Unmarshal([]byte(jsonText), &output); err != nil {
        return nil, fmt.Errorf("failed to parse JSON: %v\nraw: %s", err, jsonText)
    }

    return output, nil
}
