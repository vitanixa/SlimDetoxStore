// src/pages/StrengthBuilder.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const StrengthBuilder = () => (
  <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Strength Builder</h1>
    <p className="text-gray-600 mb-6">
      21 days of progressive resistance and bodyweight training to build lean muscle.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {Array.from({ length: 21 }, (_, i) => {
        const day = i + 1;
        const focus = ['Strength', 'Upper Body', 'Lower Body', 'Core'][i % 4];
        const filename = `strength-day${day}.mp4`;
        const description = `${focus} workout for functional strength and endurance.`;

        return (
          <div key={day} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-semibold mb-1">Day {day}: {focus} Focus</h3>
            <p className="text-sm text-gray-700 mb-3">{description}</p>
            <Link
              to={`/fitness/player?video=${filename}&program=strength-builder`}
              className="text-sm bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
            >
              ▶ Watch Now
            </Link>
          </div>
        );
      })}
    </div>
  </div>
);

export default StrengthBuilder;

