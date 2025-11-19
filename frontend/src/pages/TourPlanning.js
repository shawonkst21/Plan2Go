import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function TourPlanning() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [planData, setPlanData] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingDivisions, setLoadingDivisions] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const selectedDivision = watch("division");

  // Fetch divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("https://bdapis.com/api/v1.2/divisions");
        const data = await response.json();
        setDivisions(data.data || []);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      } finally {
        setLoadingDivisions(false);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch districts when division changes
  useEffect(() => {
    if (selectedDivision) {
      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
          const response = await fetch(`https://bdapis.com/api/v1.2/division/${selectedDivision}`);
          const data = await response.json();
          setDistricts(data.data || []);
        } catch (error) {
          console.error("Error fetching districts:", error);
          setDistricts([]);
        } finally {
          setLoadingDistricts(false);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedDivision]);

  const onSubmit = async (data) => {
    setServerError("");
    setPlanData(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/users/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          division: data.division,
          district: data.district,
          budget: data.budget,
          locationType: data.locationType,
          days: Number(data.days)
        })
      });
      const responseData = await res.json();
      if (!res.ok) {
        setServerError(responseData.error || "Failed to create tour plan");
        return;
      }
      setPlanData(responseData);
    } catch (error) {
      setServerError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  if (planData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 py-12 px-4">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={() => setPlanData(null)}
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-4"
            >
              ← Create New Plan
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Your Tour Plan for {planData.district}, {planData.division}
            </h1>
            <p>{planData.days} Days • Budget: {planData.budget}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {planData.locations.map((location, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <img src={location.image_url} alt={location.name} className="w-full h-64 object-cover rounded-xl mb-4" />
                <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
                <p className="text-gray-600 mb-4">{location.description}</p>
                <div className="mb-2">
                  <strong>Activities:</strong> {location.activities.join(", ")}
                </div>
                <div>
                  <strong>Recommended Items:</strong> {location.accessories.slice(0, 4).join(", ")}
                  {location.accessories.length > 4 && ` +${location.accessories.length - 4} more`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 py-12 px-4">
      <div className="relative max-w-2xl mx-auto bg-white/80 p-8 rounded-3xl shadow-xl">
        {serverError && <div className="text-red-600 mb-4">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label>Division</label>
            <select {...register("division", { required: true })} disabled={loadingDivisions} className="w-full p-3 border rounded-xl">
              <option value="">{loadingDivisions ? "Loading..." : "Select Division"}</option>
              {divisions.map((d) => (
                <option key={d.division} value={d.division}>{d.division}</option>
              ))}
            </select>
            {errors.division && <p className="text-red-600">Division is required</p>}
          </div>

          <div>
            <label>District</label>
            <select {...register("district", { required: true })} disabled={!selectedDivision || loadingDistricts} className="w-full p-3 border rounded-xl">
              <option value="">{!selectedDivision ? "Select division first" : loadingDistricts ? "Loading..." : "Select District"}</option>
              {districts.map((d) => (
                <option key={d.district} value={d.district}>{d.district}</option>
              ))}
            </select>
            {errors.district && <p className="text-red-600">District is required</p>}
          </div>

          <div>
            <label>Budget</label>
            <select {...register("budget", { required: true })} className="w-full p-3 border rounded-xl">
              <option value="">Select Budget</option>
              <option value="economical">Economical</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
            {errors.budget && <p className="text-red-600">Budget is required</p>}
          </div>

          <div>
            <label>Location Type</label>
            <select {...register("locationType", { required: true })} className="w-full p-3 border rounded-xl">
              <option value="">Select Location Type</option>
              <option value="nature">Nature</option>
              <option value="beach">Beach</option>
              <option value="hill">Hill</option>
              <option value="city">City</option>
              <option value="historical">Historical</option>
              <option value="adventure">Adventure</option>
            </select>
            {errors.locationType && <p className="text-red-600">Location Type is required</p>}
          </div>

          <div>
            <label>Number of Days</label>
            <input type="number" {...register("days", { required: true, min: 1, max: 30 })} className="w-full p-3 border rounded-xl" />
            {errors.days && <p className="text-red-600">Days must be 1-30</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold">
            {loading ? "Creating..." : "Create Tour Plan"}
          </button>
        </form>
      </div>
    </div>
  );
}