import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-200 to-green-300"></div>

      {/* Mountains */}
      <div className="absolute bottom-0 w-full h-1/2">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#4B5563"
            d="M0,256L80,218.7C160,181,320,107,480,85.3C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      {/* River */}
      <div className="absolute bottom-0 w-full h-32 bg-blue-500/70"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-white tracking-widest">
          Plan2Go
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-white/30 backdrop-blur-md text-white font-semibold px-5 py-2 rounded-lg hover:bg-white/50 transition duration-300"
        >
          Sign In
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
          Explore the world with Plan2Go
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl drop-shadow-md">
          Discover breathtaking mountains, rivers, and skies. Plan your next
          adventure now!
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-white/30 backdrop-blur-md text-white font-bold px-10 py-4 rounded-full text-xl hover:bg-white/50 transition duration-300 drop-shadow-lg"
        >
          Explore
        </button>
      </main>

      {/* Floating clouds */}
      <div className="absolute top-10 left-10 w-32 h-16 bg-white/30 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute top-20 right-20 w-40 h-20 bg-white/30 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-32 left-1/2 w-48 h-24 bg-white/20 rounded-full animate-pulse opacity-50 -translate-x-1/2"></div>
    </div>
  );
};

export default LandingPage;
