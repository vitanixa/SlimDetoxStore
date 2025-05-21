// src/pages/CalmCoreYoga.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CalmCoreYoga = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Calm & Core Yoga</h1>
    <p className="text-gray-600 mb-4">Center your body and mind with 21 days of core, breath, and flow.</p>

    <ol className="list-decimal ml-6 space-y-2">
      {Array.from({ length: 21 }, (_, i) => {
        const day = i + 1;
        const theme = ['Core Flow', 'Mindful Stretch', 'Energy Boost'][i % 3];
        const filename = `calmcore-day${day}.mp4`;
        return (
          <li key={day}>
            <strong>Day {day}:</strong>{' '}
            <Link
              to={`/fitness?video=${filename}`}
              className="text-green-700 hover:underline"
            >
              {`Calm Core Yoga - ${theme} Day ${day}`}
            </Link>
          </li>
        );
      })}
    </ol>
  </div>
);

export default CalmCoreYoga;

