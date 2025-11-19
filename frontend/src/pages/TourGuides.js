import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const TourGuides = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const guides = [
    {
      id: 1,
      name: 'Ahmed Rahman',
      location: 'Cox\'s Bazar',
      rating: 4.9,
      reviews: 127,
      price: 5000,
      languages: ['English', 'Bengali'],
      specialties: ['Beach Tours', 'Adventure', 'Photography'],
      experience: '5 years',
      avatar: '👨‍🦱',
      verified: true
    },
    {
      id: 2,
      name: 'Fatima Begum',
      location: 'Sylhet',
      rating: 4.8,
      reviews: 89,
      price: 4500,
      languages: ['English', 'Bengali', 'Hindi'],
      specialties: ['Tea Gardens', 'Nature', 'Cultural Tours'],
      experience: '7 years',
      avatar: '👩‍🦰',
      verified: true
    },
    {
      id: 3,
      name: 'Karim Uddin',
      location: 'Dhaka',
      rating: 4.7,
      reviews: 203,
      price: 3000,
      languages: ['English', 'Bengali'],
      specialties: ['City Tours', 'Historical Sites', 'Food Tours'],
      experience: '10 years',
      avatar: '👨',
      verified: true
    },
    {
      id: 4,
      name: 'Sadia Islam',
      location: 'Bandarban',
      rating: 5.0,
      reviews: 56,
      price: 6000,
      languages: ['English', 'Bengali'],
      specialties: ['Mountain Trekking', 'Adventure', 'Wildlife'],
      experience: '4 years',
      avatar: '👩',
      verified: true
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || guide.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleBookGuide = (guide) => {
    setSelectedGuide(guide);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    alert(`Booking confirmed with ${selectedGuide.name}!`);
    setShowBookingModal(false);
    setSelectedGuide(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/20 to-accent-50/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Find Tour Guides 👥</h1>
          <p className="text-xl text-gray-600">
            Book verified local guides for your next adventure
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Guides
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
              >
                <option value="">All Locations</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Bandarban">Bandarban</option>
              </select>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map(guide => (
            <div key={guide.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center text-3xl mr-4">
                      {guide.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        {guide.name}
                        {guide.verified && (
                          <span className="ml-2 text-blue-500 text-lg" title="Verified">✓</span>
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center mt-1">
                        <span className="mr-1">📍</span>
                        {guide.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-5">
                  <div className="flex items-center text-yellow-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 font-bold text-gray-900 text-lg">{guide.rating}</span>
                  </div>
                  <span className="ml-3 text-gray-600 text-sm">({guide.reviews} reviews)</span>
                </div>

                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.specialties.map((spec, index) => (
                      <span key={index} className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-xl text-xs font-bold">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-5 text-sm text-gray-600 space-y-1">
                  <p className="flex items-center">
                    <span className="mr-2">🗣️</span>
                    Languages: {guide.languages.join(', ')}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">⭐</span>
                    Experience: {guide.experience}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                  <div>
                    <span className="text-3xl font-bold text-primary-600">৳{guide.price}</span>
                    <span className="text-gray-600 text-sm ml-1">/day</span>
                  </div>
                  <button
                    onClick={() => handleBookGuide(guide)}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👥</span>
            </div>
            <p className="text-gray-600 text-lg">No guides found matching your criteria</p>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedGuide && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Book {selectedGuide.name}</h2>
              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                </div>
                <div className="bg-primary-50 p-5 rounded-2xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Amount
                  </label>
                  <div className="text-3xl font-bold text-primary-600">
                    ৳{selectedGuide.price}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3.5 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourGuides;
