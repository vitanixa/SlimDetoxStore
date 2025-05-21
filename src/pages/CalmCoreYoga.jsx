// src/pages/CalmCoreYoga.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const calmDays = Array.from({ length: 21 }, (_, i) => {
  const day = i + 1;
  const cycle = ['Flow', 'Core Stability', 'Stretch & Restore'][i % 3];
  return {
    day,
    title: `Day ${day}: ${cycle}`,
    description: `Yoga session focused on ${cycle.toLowerCase()} and mindfulness.`,
    filename: `calmcore-day${day}.mp4`
  };
});

const CalmCoreYoga = () => (
  <div className="max-w-5xl mx-auto p-6">
    <Link to="/fitness/programs" className="text-sm text-green-700 underline mb-4 inline-block">
      ← Back to Programs
    </Link>

    <h1 className="text-3xl font-bold mb-2">🧘 Calm & Core Yoga</h1>
    <p className="text-gray-600 mb-6">
      A 21-day mindful journey combining breath, core strength, and restorative stretches.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {calmDays.map(({ day, title, description, filename }) => (
        <div key={day} className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-1">{title}</h2>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <Link
            to={`/fitness?video=${filename}`}
            className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            ▶ Watch Now
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default CalmCoreYoga;

