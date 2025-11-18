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

// GenerateTourPlan generates a travel plan using Gemini and assigns working Picsum placeholder images
func (p *PlanService) GenerateTourPlan(ctx context.Context,
	division string, district string, budget string, locationType string, days int) (map[string]interface{}, error) {

	// Updated Gemini prompt: includes hotels and restaurants
	prompt := fmt.Sprintf(`
You are an expert Bangladesh travel recommendation AI.

Use ALL the following user preferences:

Division: %s
District: %s
Trip Duration: %d days
Budget Type: %s            (economical | normal | luxury)
Preferred Location Type: %s (chill | nature | urban | mountains)

Your tasks:
1. Recommend the BEST tourist locations inside the district.
2. For each location, provide:
   - Nearby hotels suitable for the user's budget
   - Famous restaurants nearby
3. Recommendations must be based on:
   - Expected weather for the next %d days
   - User's budget type
   - User's preferred location type
   - Accessibility and safety
   - Experience quality during that weather
4. Weather MUST influence:
   - Which locations you choose
   - Accessories list
   - Outdoor vs indoor preference

Accessories Rules:
- Include practical items for the location, weather, and trip type.
- Examples: raincoat, sunglasses, water bottle, camera, hiking shoes.

STRICT OUTPUT RULES:
- Return ONLY valid JSON of the format given below.
- No explanation, no extra text, no markdown.
- MUST strictly match the JSON schema below.
- No trailing commas.
- Provide 4-7 locations.
- rating must be between 3.5 and 5.
- accessories must be appropriate for the weather and activities.
- For hotels and restaurants, provide 1-3 options each per location.

JSON Format:
{
  "division": "",
  "district": "",
  "days": 0,
  "budget": "",
  "location_type": "",
  "weather_considered": true,
  "locations": [
    {
      "name": "",
      "description": "",
      "activities": [],
      "rating": 0,
      "accessories": [],
      "hotels_nearby": [
        {"name": "", "rating": 0}
      ],
      "restaurants_nearby": [
        {"name": "", "rating": 0}
      ]
    }
  ]
}
`, division, district, days, budget, locationType, days)

	// Call Gemini API
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

	// Parse JSON response
	jsonText := result.Text()
	var output map[string]interface{}
	if err := json.Unmarshal([]byte(jsonText), &output); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %v\nraw: %s", err, jsonText)
	}

	// Assign working placeholder images using Lorem Picsum
	if locations, ok := output["locations"].([]interface{}); ok {
		for i, loc := range locations {
			if locMap, ok := loc.(map[string]interface{}); ok {
				locMap["image_url"] = fmt.Sprintf("https://picsum.photos/1600/900?%s&random=%d", locationType, i)
			}
		}
	}

	return output, nil
}
