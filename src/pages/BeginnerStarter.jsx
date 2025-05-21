// src/pages/BeginnerStarter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const phases = ['Mobility', 'Foundation', 'Core', 'Stretching'];

const BeginnerStarter = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4">
        <Link to="/fitness/programs" className="text-sm text-green-700 underline hover:text-green-800">
          ← Back to All Programs
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">🔰 Beginner Starter</h1>
      <p className="text-gray-600 mb-6">
        4-week low-impact plan to help you build strength, confidence, and consistency.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 28 }, (_, i) => {
          const day = i + 1;
          const phase = phases[i % phases.length];
          const filename = `beginner-day${day}.mp4`;

          return (
            <div key={day} className="bg-white p-4 rounded shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-1">Day {day}: {phase}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {phase}-focused movement and control to establish mind-body connection.
              </p>
              <Link to={`/fitness?video=${filename}`} className="text-green-700 text-sm hover:underline">
                ▶ Watch Placeholder
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BeginnerStarter;

