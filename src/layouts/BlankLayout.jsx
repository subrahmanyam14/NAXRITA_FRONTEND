// src/layouts/BlankLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
  // Starfield animation state
  const [stars, setStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  // Generate animated background elements
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 3
        });
      }
      setStars(starArray);
    };

    const generateSparkles = () => {
      const sparkleArray = [];
      for (let i = 0; i < 25; i++) {
        sparkleArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          animationDelay: Math.random() * 8
        });
      }
      setSparkles(sparkleArray);
    };

    generateStars();
    generateSparkles();
  }, []);

  return (
    <div className="min-h-screen w-full h-full bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden flex items-center justify-center">
      
      {/* Animated Starfield Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div> */}

      {/* Floating Sparkles
      <div className="absolute inset-0 overflow-hidden">
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute rounded-full bg-blue-400 animate-bounce"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animationDelay: `${sparkle.animationDelay}s`,
              animationDuration: '8s'
            }}
          />
        ))}
      </div> */}

      {/* Cosmic Nebula Clouds */}
      {/* <div className="absolute inset-0">
        <div className="absolute w-96 h-96 rounded-full opacity-10 bg-blue-600 blur-3xl top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-80 h-80 rounded-full opacity-5 bg-purple-600 blur-3xl bottom-1/4 right-1/4 animate-pulse animation-delay-2000" />
        <div className="absolute w-72 h-72 rounded-full opacity-3 bg-indigo-600 blur-3xl top-3/4 left-3/4 animate-pulse animation-delay-4000" />
      </div> */}

      {/* Content Container with proper z-index */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Outlet />
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BlankLayout;
