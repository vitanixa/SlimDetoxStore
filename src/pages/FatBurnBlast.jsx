// src/pages/FatBurnBlast.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FatBurnBlast = () => (
  <div className="max-w-6xl mx-auto p-6">
    <Link
      to="/fitness/programs"
      className="text-sm text-green-700 hover:underline mb-4 inline-block"
    >
      ← Back to All Programs
    </Link>

    <h1 className="text-3xl font-bold mb-4">Fat Burn Blast</h1>
    <p className="text-gray-600 mb-6">
      A 14-day high-intensity challenge alternating HIIT, cardio, and dance workouts to rev up metabolism and burn fat fast.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {Array.from({ length: 14 }, (_, i) => {
        const day = i + 1;
        const focus = ['HIIT', 'Cardio', 'Dance'][i % 3];
        const filename = `fatburn-day${day}.mp4`;
        const description = `${focus} workout to elevate heart rate and burn fat.`;

        return (
          <div key={day} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-semibold mb-1">Day {day}: {focus} Focus</h3>
            <p className="text-sm text-gray-700 mb-3">{description}</p>
            <Link
              to={`/fitness/player?video=${filename}&program=fat-burn-blast`}
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

export default FatBurnBlast;

