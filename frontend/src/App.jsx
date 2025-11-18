import React, { useState, useEffect } from "react";
import {
  MapPin,
  Cloud,
  Calendar,
  DollarSign,
  Mountain,
  Compass,
  Users,
  Hotel,
  Utensils,
  Navigation,
  Search,
  Menu,
  X,
  Star,
  Phone,
  Mail,
  Clock,
  CheckCircle,
} from "lucide-react";

const TravelPlannerApp = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Travel planning state
  const [travelPlan, setTravelPlan] = useState({
    division: "",
    district: "",
    days: 1,
    budget: "normal",
    locationType: "nature",
  });

  const [recommendations, setRecommendations] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [mapView, setMapView] = useState(null);

  // Tour guide state
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Bangladesh divisions and districts
  const divisions = {
    Dhaka: [
      "Dhaka",
      "Gazipur",
      "Narayanganj",
      "Tangail",
      "Kishoreganj",
      "Manikganj",
      "Munshiganj",
      "Narsingdi",
      "Rajbari",
      "Madaripur",
      "Gopalganj",
      "Shariatpur",
      "Faridpur",
    ],
    Chittagong: [
      "Chittagong",
      "Cox's Bazar",
      "Rangamati",
      "Bandarban",
      "Khagrachari",
      "Feni",
      "Lakshmipur",
      "Comilla",
      "Noakhali",
      "Brahmanbaria",
      "Chandpur",
    ],
    Rajshahi: [
      "Rajshahi",
      "Bogra",
      "Pabna",
      "Sirajganj",
      "Natore",
      "Naogaon",
      "Chapainawabganj",
      "Joypurhat",
    ],
    Khulna: [
      "Khulna",
      "Jessore",
      "Satkhira",
      "Bagerhat",
      "Chuadanga",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
      "Jhenaidah",
    ],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Barisal: [
      "Barisal",
      "Patuakhali",
      "Bhola",
      "Pirojpur",
      "Jhalokati",
      "Barguna",
    ],
    Rangpur: [
      "Rangpur",
      "Dinajpur",
      "Panchagarh",
      "Thakurgaon",
      "Nilphamari",
      "Lalmonirhat",
      "Kurigram",
      "Gaibandha",
    ],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  // Sample tour guides
  useEffect(() => {
    setGuides([
      {
        id: 1,
        name: "Karim Rahman",
        rating: 4.9,
        reviews: 127,
        experience: "8 years",
        languages: ["Bengali", "English", "Hindi"],
        specialty: "Hill Tracts",
        price: 3000,
        location: "Bandarban",
        image: "👨‍🦱",
        verified: true,
      },
      {
        id: 2,
        name: "Ayesha Begum",
        rating: 4.8,
        reviews: 94,
        experience: "5 years",
        languages: ["Bengali", "English"],
        specialty: "Sundarbans",
        price: 2500,
        location: "Khulna",
        image: "👩",
        verified: true,
      },
      {
        id: 3,
        name: "Rafiq Ahmed",
        rating: 4.7,
        reviews: 156,
        experience: "10 years",
        languages: ["Bengali", "English", "Urdu"],
        specialty: "Historical Sites",
        price: 2000,
        location: "Dhaka",
        image: "👨",
        verified: true,
      },
      {
        id: 4,
        name: "Nadia Islam",
        rating: 4.9,
        reviews: 89,
        experience: "6 years",
        languages: ["Bengali", "English"],
        specialty: "Beach Tours",
        price: 2800,
        location: "Cox's Bazar",
        image: "👩‍🦰",
        verified: true,
      },
    ]);
  }, []);

  // Simulated weather API call
  const fetchWeather = (district) => {
    const weatherConditions = [
      "Sunny",
      "Partly Cloudy",
      "Cloudy",
      "Rainy",
      "Humid",
    ];
    const randomWeather =
      weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const temp = Math.floor(Math.random() * 15) + 20;

    setWeatherData({
      condition: randomWeather,
      temperature: temp,
      humidity: Math.floor(Math.random() * 40) + 60,
      district: district,
    });
  };

  // AI recommendation engine
  const generateRecommendations = () => {
    const { division, district, days, budget, locationType } = travelPlan;

    // Fetch weather
    fetchWeather(district);

    // Sample places database
    const placesDatabase = {
      nature: [
        {
          name: "Sundarbans Mangrove Forest",
          district: "Khulna",
          type: "Nature Reserve",
          rating: 4.8,
          activities: ["Boat Safari", "Wildlife Watching", "Photography"],
          accessories: [
            "Binoculars",
            "Camera",
            "Sunscreen",
            "Hat",
            "Mosquito Repellent",
          ],
        },
        {
          name: "Ratargul Swamp Forest",
          district: "Sylhet",
          type: "Wetland",
          rating: 4.7,
          activities: ["Boat Ride", "Bird Watching", "Nature Walk"],
          accessories: ["Waterproof Bag", "Camera", "Hat", "Sunglasses"],
        },
        {
          name: "Lawachara National Park",
          district: "Moulvibazar",
          type: "Rainforest",
          rating: 4.6,
          activities: ["Trekking", "Wildlife Spotting", "Camping"],
          accessories: [
            "Trekking Shoes",
            "Backpack",
            "Water Bottle",
            "Insect Repellent",
          ],
        },
        {
          name: "Srimangal Tea Gardens",
          district: "Moulvibazar",
          type: "Tea Estate",
          rating: 4.8,
          activities: ["Tea Tasting", "Cycling", "Photography"],
          accessories: ["Camera", "Comfortable Shoes", "Sun Hat"],
        },
      ],
      mountains: [
        {
          name: "Nilgiri Hills",
          district: "Bandarban",
          type: "Mountain",
          rating: 4.9,
          activities: ["Hiking", "Cloud Watching", "Sunrise View"],
          accessories: [
            "Warm Jacket",
            "Trekking Shoes",
            "Camera",
            "Flashlight",
          ],
        },
        {
          name: "Keokradong",
          district: "Bandarban",
          type: "Peak",
          rating: 4.8,
          activities: ["Mountaineering", "Camping", "Star Gazing"],
          accessories: [
            "Camping Gear",
            "Warm Clothes",
            "Trekking Poles",
            "First Aid Kit",
          ],
        },
        {
          name: "Sajek Valley",
          district: "Rangamati",
          type: "Valley",
          rating: 4.9,
          activities: ["Sightseeing", "Photography", "Cloud Touching"],
          accessories: ["Warm Jacket", "Camera", "Power Bank"],
        },
        {
          name: "Boga Lake",
          district: "Bandarban",
          type: "Mountain Lake",
          rating: 4.7,
          activities: ["Trekking", "Camping", "Swimming"],
          accessories: ["Tent", "Sleeping Bag", "Trekking Gear"],
        },
      ],
      chill: [
        {
          name: "Cox's Bazar Beach",
          district: "Cox's Bazar",
          type: "Beach",
          rating: 4.7,
          activities: ["Swimming", "Beach Walk", "Surfing"],
          accessories: ["Swimsuit", "Sunscreen", "Beach Towel", "Sunglasses"],
        },
        {
          name: "Kuakata Beach",
          district: "Patuakhali",
          type: "Beach",
          rating: 4.6,
          activities: ["Sunrise/Sunset View", "Beach Activities", "Boat Ride"],
          accessories: ["Camera", "Beach Chair", "Cooler Bag", "Hat"],
        },
        {
          name: "Saint Martin's Island",
          district: "Cox's Bazar",
          type: "Island",
          rating: 4.9,
          activities: ["Snorkeling", "Beach Relaxation", "Coral Viewing"],
          accessories: ["Snorkeling Gear", "Waterproof Camera", "Beach Wear"],
        },
        {
          name: "Patenga Sea Beach",
          district: "Chittagong",
          type: "Beach",
          rating: 4.4,
          activities: ["Beach Walk", "Food Stalls", "Photography"],
          accessories: ["Comfortable Shoes", "Sunscreen", "Camera"],
        },
      ],
      urban: [
        {
          name: "Lalbagh Fort",
          district: "Dhaka",
          type: "Historical",
          rating: 4.5,
          activities: ["History Tour", "Photography", "Museum Visit"],
          accessories: ["Camera", "Comfortable Shoes", "Water Bottle"],
        },
        {
          name: "Ahsan Manzil",
          district: "Dhaka",
          type: "Palace Museum",
          rating: 4.6,
          activities: [
            "Museum Tour",
            "Architecture Photography",
            "History Learning",
          ],
          accessories: ["Camera", "Notebook", "Comfortable Shoes"],
        },
        {
          name: "Paharpur Buddhist Monastery",
          district: "Naogaon",
          type: "Archaeological",
          rating: 4.7,
          activities: ["Historical Tour", "Photography", "Cultural Learning"],
          accessories: ["Camera", "Hat", "Water", "Guidebook"],
        },
        {
          name: "Kantajew Temple",
          district: "Dinajpur",
          type: "Temple",
          rating: 4.6,
          activities: [
            "Architecture Tour",
            "Photography",
            "Cultural Experience",
          ],
          accessories: ["Camera", "Respectful Clothing", "Water"],
        },
      ],
    };

    const relevantPlaces =
      placesDatabase[locationType] || placesDatabase.nature;

    // Filter by district if specific district selected
    let filteredPlaces = relevantPlaces;
    if (district) {
      filteredPlaces = relevantPlaces.filter((p) => p.district === district);
      if (filteredPlaces.length === 0) filteredPlaces = relevantPlaces;
    }

    const selectedPlaces = filteredPlaces.slice(
      0,
      Math.min(days * 2, filteredPlaces.length)
    );

    const budgetMultiplier =
      budget === "economical" ? 0.7 : budget === "luxury" ? 1.5 : 1;

    const itinerary = selectedPlaces.map((place, index) => ({
      ...place,
      day: Math.floor(index / 2) + 1,
      estimatedCost: Math.floor(
        (Math.random() * 2000 + 1000) * budgetMultiplier
      ),
      hotels: generateNearbyLocations("hotel", place.name),
      restaurants: generateNearbyLocations("restaurant", place.name),
      transport: generateNearbyLocations("transport", place.name),
    }));

    setRecommendations({
      itinerary,
      totalEstimatedCost: itinerary.reduce(
        (sum, item) => sum + item.estimatedCost,
        0
      ),
      accessories: [...new Set(itinerary.flatMap((p) => p.accessories))],
      budget: budget,
      days: days,
    });
  };

  const generateNearbyLocations = (type, placeName) => {
    const hotels = [
      { name: "Hotel Paradise", rating: 4.5, distance: "0.5 km", price: 3500 },
      {
        name: "Green View Resort",
        rating: 4.3,
        distance: "1.2 km",
        price: 4500,
      },
      { name: "Comfort Inn", rating: 4.0, distance: "0.8 km", price: 2500 },
    ];

    const restaurants = [
      {
        name: "Local Delights",
        rating: 4.6,
        distance: "0.3 km",
        cuisine: "Bengali",
      },
      {
        name: "Spice Garden",
        rating: 4.4,
        distance: "0.6 km",
        cuisine: "Multi-cuisine",
      },
      {
        name: "Street Food Corner",
        rating: 4.2,
        distance: "0.2 km",
        cuisine: "Street Food",
      },
    ];

    const transport = [
      { name: "City Bus Stand", distance: "0.4 km", type: "Bus" },
      { name: "Local Transport Hub", distance: "0.7 km", type: "Various" },
      { name: "Taxi Stand", distance: "0.2 km", type: "Taxi" },
    ];

    if (type === "hotel") return hotels;
    if (type === "restaurant") return restaurants;
    return transport;
  };

  const getWeatherIcon = (condition) => {
    if (condition.includes("Sunny")) return "☀️";
    if (condition.includes("Cloudy")) return "☁️";
    if (condition.includes("Rainy")) return "🌧️";
    return "🌤️";
  };

  const getWeatherAccessories = (condition) => {
    const accessories = [];
    if (condition.includes("Rainy")) {
      accessories.push("Umbrella", "Raincoat", "Waterproof Bag");
    }
    if (condition.includes("Sunny")) {
      accessories.push("Sunscreen", "Sunglasses", "Hat", "Water Bottle");
    }
    if (condition.includes("Humid")) {
      accessories.push("Light Clothing", "Hand Fan", "Extra Water");
    }
    return accessories;
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">TravelBD</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-blue-600 transition">
                Home
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition">
                Features
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition">
                Tour Guides
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition">
                About
              </button>
            </div>

            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => {
                  setUser({ name: "Guest User" });
                  setCurrentPage("dashboard");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button className="block w-full text-left text-gray-700 hover:text-blue-600">
                Home
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-blue-600">
                Features
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-blue-600">
                Tour Guides
              </button>
              <button
                onClick={() => {
                  setUser({ name: "Guest User" });
                  setCurrentPage("dashboard");
                }}
                className="block w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Bangladesh's Hidden Gems
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plan your perfect trip with AI-powered recommendations, weather
            insights, and expert tour guides. Experience the beauty of
            Bangladesh like never before.
          </p>
          <button
            onClick={() => {
              setUser({ name: "Guest User" });
              setCurrentPage("dashboard");
            }}
            className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
          >
            Start Planning Your Trip
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Cloud className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Weather-Based Planning
            </h3>
            <p className="text-gray-600">
              Get real-time weather updates and smart accessory recommendations
              for your journey.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Compass className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI Travel Recommendations
            </h3>
            <p className="text-gray-600">
              Personalized itineraries based on your preferences, budget, and
              travel style.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Users className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Expert Tour Guides
            </h3>
            <p className="text-gray-600">
              Connect with verified local guides who know the best spots and
              hidden treasures.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <MapPin className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Interactive Maps
            </h3>
            <p className="text-gray-600">
              Explore hotels, restaurants, and attractions with our
              comprehensive location mapping.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <DollarSign className="w-12 h-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Budget-Friendly Options
            </h3>
            <p className="text-gray-600">
              Choose from economical, normal, or luxury travel plans that fit
              your budget.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Mountain className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Diverse Destinations
            </h3>
            <p className="text-gray-600">
              From beaches to mountains, nature to urban - explore every corner
              of Bangladesh.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-6 h-6" />
                <span className="text-xl font-bold">TravelBD</span>
              </div>
              <p className="text-gray-400">
                Your ultimate travel companion for exploring Bangladesh.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white">About Us</button>
                </li>
                <li>
                  <button className="hover:text-white">Contact</button>
                </li>
                <li>
                  <button className="hover:text-white">Privacy Policy</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white">Trip Planning</button>
                </li>
                <li>
                  <button className="hover:text-white">Tour Guides</button>
                </li>
                <li>
                  <button className="hover:text-white">
                    Hotels & Restaurants
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <p className="text-gray-400 mb-2">Email: info@travelbd.com</p>
              <p className="text-gray-400">Phone: +880 1234-567890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TravelBD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">TravelBD</span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Plan Trip
              </button>
              <button
                onClick={() => setCurrentPage("guides")}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Tour Guides
              </button>
              <button
                onClick={() => setCurrentPage("landing")}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!recommendations ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Plan Your Perfect Trip
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Division Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Select Division
                </label>
                <select
                  value={travelPlan.division}
                  onChange={(e) =>
                    setTravelPlan({
                      ...travelPlan,
                      division: e.target.value,
                      district: "",
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose Division</option>
                  {Object.keys(divisions).map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Navigation className="inline w-4 h-4 mr-1" />
                  Select District
                </label>
                <select
                  value={travelPlan.district}
                  onChange={(e) =>
                    setTravelPlan({ ...travelPlan, district: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!travelPlan.division}
                >
                  <option value="">Choose District</option>
                  {travelPlan.division &&
                    divisions[travelPlan.division].map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                </select>
              </div>

              {/* Number of Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Number of Days
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={travelPlan.days}
                  onChange={(e) =>
                    setTravelPlan({
                      ...travelPlan,
                      days: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Budget Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Budget Type
                </label>
                <select
                  value={travelPlan.budget}
                  onChange={(e) =>
                    setTravelPlan({ ...travelPlan, budget: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="economical">Economical</option>
                  <option value="normal">Normal</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>

            {/* Location Type Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Compass className="inline w-4 h-4 mr-1" />
                Preferred Location Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["chill", "nature", "urban", "mountains"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setTravelPlan({ ...travelPlan, locationType: type })
                    }
                    className={`px-6 py-4 rounded-lg border-2 transition capitalize ${
                      travelPlan.locationType === type
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {type === "chill" && "🏖️"}
                    {type === "nature" && "🌳"}
                    {type === "urban" && "🏙️"}
                    {type === "mountains" && "⛰️"}
                    <span className="block mt-2 font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateRecommendations}
              disabled={!travelPlan.division || !travelPlan.district}
              className="mt-8 w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-medium"
            >
              Generate Travel Plan
            </button>
          </div>
        ) : (
          <div>
            {/* Weather Card */}
            {weatherData && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Weather in {weatherData.district}
                    </h3>
                    <p className="text-lg">{weatherData.condition}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl mb-2">
                      {getWeatherIcon(weatherData.condition)}
                    </div>
                    <p className="text-3xl font-bold">
                      {weatherData.temperature}°C
                    </p>
                    <p className="text-sm">Humidity: {weatherData.humidity}%</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-400">
                  <p className="font-medium mb-2">
                    Recommended Accessories for Weather:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getWeatherAccessories(weatherData.condition).map(
                      (acc, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm"
                        >
                          {acc}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Trip Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Your Travel Plan
                </h3>
                <button
                  onClick={() => setRecommendations(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  New Plan
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-xl font-bold text-gray-900">
                    {recommendations.days} Days
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-xl font-bold text-gray-900 capitalize">
                    {recommendations.budget}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Places</p>
                  <p className="text-xl font-bold text-gray-900">
                    {recommendations.itinerary.length}
                  </p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <p className="text-sm text-gray-600">Est. Cost</p>
                  <p className="text-xl font-bold text-gray-900">
                    ৳{recommendations.totalEstimatedCost}
                  </p>
                </div>
              </div>
            </div>

            {/* Essential Accessories */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Essential Accessories
              </h3>
              <div className="flex flex-wrap gap-3">
                {recommendations.accessories.map((acc, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg text-gray-700"
                  >
                    ✓ {acc}
                  </span>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-6">
              {recommendations.itinerary.map((place, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold">Day {place.day}</h4>
                      <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                        {place.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {place.name}
                        </h3>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {place.district}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="ml-1 font-bold text-gray-900">
                            {place.rating}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Est. ৳{place.estimatedCost}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Activities:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {place.activities.map((activity, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Recommended Accessories:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {place.accessories.map((acc, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                          >
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <button
                        onClick={() =>
                          setMapView({
                            type: "hotel",
                            place: place.name,
                            locations: place.hotels,
                          })
                        }
                        className="flex items-center justify-center px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition"
                      >
                        <Hotel className="w-5 h-5 mr-2 text-purple-600" />
                        <span className="font-medium text-purple-700">
                          Nearby Hotels
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          setMapView({
                            type: "restaurant",
                            place: place.name,
                            locations: place.restaurants,
                          })
                        }
                        className="flex items-center justify-center px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-lg hover:bg-orange-100 transition"
                      >
                        <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                        <span className="font-medium text-orange-700">
                          Restaurants
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          setMapView({
                            type: "transport",
                            place: place.name,
                            locations: place.transport,
                          })
                        }
                        className="flex items-center justify-center px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="font-medium text-blue-700">
                          Transport
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map Modal */}
      {mapView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 capitalize">
                {mapView.type}s near {mapView.place}
              </h3>
              <button
                onClick={() => setMapView(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Simulated Map */}
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 mb-6 h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500 rounded-full"></div>
                </div>
                <div className="relative text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-red-600" />
                  <p className="text-xl font-bold text-gray-800">
                    Interactive Map View
                  </p>
                  <p className="text-gray-600 mt-2">
                    Showing {mapView.locations.length} locations
                  </p>
                </div>
              </div>

              {/* Location List */}
              <div className="space-y-4">
                {mapView.locations.map((loc, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">
                          {loc.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          <Navigation className="inline w-4 h-4 mr-1" />
                          {loc.distance} away
                        </p>
                        {loc.rating && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">
                              {loc.rating}
                            </span>
                          </div>
                        )}
                        {loc.cuisine && (
                          <p className="text-sm text-gray-600 mt-1">
                            Cuisine: {loc.cuisine}
                          </p>
                        )}
                        {loc.type && (
                          <p className="text-sm text-gray-600 mt-1">
                            Type: {loc.type}
                          </p>
                        )}
                      </div>
                      {loc.price && (
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ৳{loc.price}
                          </p>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Tour Guides Page
  const TourGuidesPage = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">TravelBD</span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Plan Trip
              </button>
              <button
                onClick={() => setCurrentPage("guides")}
                className="text-blue-600 font-medium"
              >
                Tour Guides
              </button>
              <button
                onClick={() => setCurrentPage("landing")}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Expert Tour Guides
          </h2>
          <p className="text-gray-600">
            Connect with verified local guides for an unforgettable experience
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Locations</option>
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Cox's Bazar</option>
                <option>Bandarban</option>
                <option>Sylhet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Specialties</option>
                <option>Hill Tracts</option>
                <option>Beaches</option>
                <option>Historical Sites</option>
                <option>Nature</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Languages</option>
                <option>Bengali</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-5xl mr-4">{guide.image}</div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold text-gray-900">
                          {guide.name}
                        </h3>
                        {guide.verified && (
                          <CheckCircle className="w-5 h-5 ml-2 text-blue-600" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{guide.location}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-bold text-gray-900">
                          {guide.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          ({guide.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ৳{guide.price}
                    </p>
                    <p className="text-xs text-gray-500">per day</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{guide.experience} of experience</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Compass className="w-4 h-4 mr-2" />
                    <span>Specialty: {guide.specialty}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Languages: {guide.languages.join(", ")}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Profile
                  </button>
                  <button className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post Guide Service Button */}
        <div className="mt-8 text-center">
          <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-lg font-medium">
            Register as Tour Guide
          </button>
        </div>
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Guide Profile
              </h3>
              <button
                onClick={() => setSelectedGuide(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">{selectedGuide.image}</div>
                <div className="flex items-center justify-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedGuide.name}
                  </h3>
                  {selectedGuide.verified && (
                    <CheckCircle className="w-6 h-6 ml-2 text-blue-600" />
                  )}
                </div>
                <p className="text-gray-600">{selectedGuide.location}</p>
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-bold text-gray-900">
                    {selectedGuide.rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({selectedGuide.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Experience</p>
                  <p className="font-bold text-gray-900">
                    {selectedGuide.experience}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Specialty</p>
                  <p className="font-bold text-gray-900">
                    {selectedGuide.specialty}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Languages</p>
                  <p className="font-bold text-gray-900">
                    {selectedGuide.languages.join(", ")}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Rate</p>
                  <p className="font-bold text-green-600 text-xl">
                    ৳{selectedGuide.price} per day
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Book This Guide
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {currentPage === "landing" && <LandingPage />}
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "guides" && <TourGuidesPage />}
    </div>
  );
};

export default TravelPlannerApp;
