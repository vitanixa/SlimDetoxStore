// src/pages/StrengthBuilder.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const phases = ['Strength', 'Upper Body', 'Lower Body', 'Core'];

const StrengthBuilder = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4">
        <Link to="/fitness/programs" className="text-sm text-green-700 underline hover:text-green-800">
          ← Back to All Programs
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">💪 Strength Builder</h1>
      <p className="text-gray-600 mb-6">
        21-day progressive resistance training using bodyweight moves and split-day targeting.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 21 }, (_, i) => {
          const day = i + 1;
          const phase = phases[i % phases.length];
          const filename = `strength-day${day}.mp4`;

          return (
            <div key={day} className="bg-white p-4 rounded shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-1">Day {day}: {phase} Day</h2>
              <p className="text-sm text-gray-600 mb-2">
                {phase} focus workout designed to improve strength, posture, and form.
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

export default StrengthBuilder;

