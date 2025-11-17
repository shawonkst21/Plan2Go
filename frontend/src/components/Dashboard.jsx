import React, { useState, useEffect } from "react";
import { User, MapPin } from "lucide-react";

// All divisions & districts of Bangladesh
const divisions = {
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Chattogram: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Cumilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Rajshahi: [
    "Bogura",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Chapainawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Barishal: [
    "Barguna",
    "Barishal",
    "Bhola",
    "Jhalokathi",
    "Patuakhali",
    "Pirojpur",
  ],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

const Dashboard = () => {
  const [selectedDivision, setSelectedDivision] = useState("Sylhet");
  const [selectedDistrict, setSelectedDistrict] = useState(
    divisions["Sylhet"][0]
  );
  const [days, setDays] = useState(1);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch locations from backend
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getTravelPlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          division: selectedDivision,
          district: selectedDistrict,
          days,
        }),
      });
      const data = await res.json();
      setLocations(data.locations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [selectedDivision, selectedDistrict, days]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-green-300 to-yellow-200 p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#071029"
            fillOpacity="0.4"
            d="M0,192L80,165.3C160,139,320,85,480,90.7C640,96,800,160,960,160C1120,160,1280,96,1360,64L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          Plan2Go
        </h1>
        <button className="bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition">
          <User size={24} />
        </button>
      </div>

      {/* Selector row: Division, District, Days */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        {/* Division */}
        <select
          value={selectedDivision}
          onChange={(e) => {
            setSelectedDivision(e.target.value);
            setSelectedDistrict(divisions[e.target.value][0]);
          }}
          className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-blue-400 transition outline-none"
        >
          {Object.keys(divisions).map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-blue-400 transition outline-none"
        >
          {divisions[selectedDivision].map((dist) => (
            <option key={dist} value={dist}>
              {dist}
            </option>
          ))}
        </select>

        {/* Days horizontal scroller */}
        <div className="flex overflow-x-auto gap-3 py-2 md:flex-1">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setDays(day)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-white shadow-md transition transform ${
                days === day
                  ? "bg-gradient-to-br from-green-400 via-lime-400 to-emerald-500 scale-110 shadow-lg animate-pulse"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {day} Day{day > 1 ? "s" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-white col-span-full text-center">
            Fetching your adventure...
          </p>
        ) : locations.length === 0 ? (
          <p className="text-white col-span-full text-center">
            No locations found.
          </p>
        ) : (
          locations.map((loc, idx) => (
            <div
              key={idx}
              className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:scale-105 transform transition relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="text-white" />
                <h3 className="text-xl font-bold text-white">{loc.name}</h3>
              </div>
              <p className="text-white/90 text-sm">{loc.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
