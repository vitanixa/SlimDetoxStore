// src/pages/BeginnerStarter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BeginnerStarter = () => (
  <div className="max-w-6xl mx-auto p-6">
    <Link
      to="/fitness/programs"
      className="text-sm text-green-700 hover:underline mb-4 inline-block"
    >
      ← Back to All Programs
    </Link>

    <h1 className="text-3xl font-bold mb-4">Beginner Starter</h1>
    <p className="text-gray-600 mb-6">
      Perfect for beginners — build balance, strength, and endurance in just 4 weeks.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {Array.from({ length: 28 }, (_, i) => {
        const day = i + 1;
        const focus = ['Foundation', 'Mobility', 'Core', 'Recovery'][i % 4];
        const filename = `beginner-day${day}.mp4`;
        const description = `${focus} workout to improve form and consistency.`;

        return (
          <div key={day} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-semibold mb-1">Day {day}: {focus} Focus</h3>
            <p className="text-sm text-gray-700 mb-3">{description}</p>
            <Link
              to={`/fitness/player?video=${filename}&program=beginner-starter`}
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

export default BeginnerStarter;

