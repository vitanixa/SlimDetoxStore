// src/pages/CalmCoreYoga.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CalmCoreYoga = () => (
  <div className="max-w-6xl mx-auto p-6">
    <Link
      to="/fitness/programs"
      className="text-sm text-green-700 hover:underline mb-4 inline-block"
    >
      ← Back to All Programs
    </Link>

    <h1 className="text-3xl font-bold mb-4">Calm & Core Yoga</h1>
    <p className="text-gray-600 mb-6">
      A 21-day journey to calm the mind, improve flexibility, and strengthen the core.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {Array.from({ length: 21 }, (_, i) => {
        const day = i + 1;
        const focus = ['Flow', 'Balance', 'Core', 'Mindfulness'][i % 4];
        const filename = `calmcore-day${day}.mp4`;
        const description = `${focus} yoga to center and strengthen body and mind.`;

        return (
          <div key={day} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-semibold mb-1">Day {day}: {focus} Focus</h3>
            <p className="text-sm text-gray-700 mb-3">{description}</p>
            <Link
              to={`/fitness/player?video=${filename}&program=calm-core-yoga`}
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

export default CalmCoreYoga;

