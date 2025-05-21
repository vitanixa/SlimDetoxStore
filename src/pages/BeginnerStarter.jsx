// src/pages/BeginnerStarter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const beginnerDays = Array.from({ length: 28 }, (_, i) => {
  const day = i + 1;
  const week = Math.floor(i / 7) + 1;
  const focus = ["Mobility", "Core", "Balance", "Recovery"][i % 4];
  return {
    day,
    title: `Week ${week} - ${focus}`,
    description: `Foundational exercises to build strength, stability, and consistency.`,
    filename: `beginner-day${day}.mp4`
  };
});

const BeginnerStarter = () => (
  <div className="max-w-5xl mx-auto p-6">
    <Link to="/fitness/programs" className="text-sm text-green-700 underline mb-4 inline-block">
      ← Back to Programs
    </Link>

    <h1 className="text-3xl font-bold mb-2">🔰 Beginner Starter</h1>
    <p className="text-gray-600 mb-6">
      A gentle 28-day journey for those just starting out. Build consistency, mobility, and strength.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {beginnerDays.map(({ day, title, description, filename }) => (
        <div key={day} className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-1">Day {day}: {title}</h2>
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

export default BeginnerStarter;

