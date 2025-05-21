// src/pages/StrengthBuilder.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const StrengthBuilder = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Strength Builder</h1>
    <p className="text-gray-600 mb-4">Follow this structured daily workout plan. Each link takes you to the workout viewer.</p>

    <ol className="list-decimal ml-6 space-y-2">
      {Array.from({ length: 21 }, (_, i) => {
        const day = i + 1;
        const phase = ['Strength', 'Upper Body', 'Lower Body', 'Core'][i % 4]; // Rotate category
        const filename = `strength-day${day}.mp4`;
        return (
          <li key={day}>
            <strong>Day {day}:</strong>{' '}
            <Link
              to={`/fitness?video=${filename}`}
              className="text-green-700 hover:underline"
            >
              {`Strength Builder - ${phase} Day ${day}`}
            </Link>
          </li>
        );
      })}
    </ol>
  </div>
);

export default StrengthBuilder;

