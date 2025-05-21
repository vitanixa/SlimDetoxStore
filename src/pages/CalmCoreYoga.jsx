// src/pages/CalmCoreYoga.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const phases = ['Yoga Flow', 'Core Stability', 'Stretch & Recover'];

const CalmCoreYoga = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4">
        <Link to="/fitness/programs" className="text-sm text-green-700 underline hover:text-green-800">
          ← Back to All Programs
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">🧘 Calm & Core Yoga</h1>
      <p className="text-gray-600 mb-6">
        A 21-day calming journey through yoga, flexibility, and mindful breathwork.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 21 }, (_, i) => {
          const day = i + 1;
          const phase = phases[i % phases.length];
          const filename = `yoga-day${day}.mp4`;

          return (
            <div key={day} className="bg-white p-4 rounded shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-1">Day {day}: {phase}</h2>
              <p className="text-sm text-gray-600 mb-2">
                A blend of {phase.toLowerCase()} to relax, lengthen muscles, and build control.
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

export default CalmCoreYoga;

