// src/pages/BeginnerStarter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BeginnerStarter = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Beginner Starter</h1>
    <p className="text-gray-600 mb-4">4 weeks to reset, build balance, and ease into movement.</p>

    <ol className="list-decimal ml-6 space-y-2">
      {Array.from({ length: 28 }, (_, i) => {
        const day = i + 1;
        const focus = ['Mobility', 'Core', 'Foundation', 'Recovery'][i % 4];
        const filename = `beginner-day${day}.mp4`;
        return (
          <li key={day}>
            <strong>Day {day}:</strong>{' '}
            <Link
              to={`/fitness?video=${filename}`}
              className="text-green-700 hover:underline"
            >
              {`Beginner Starter - ${focus} Day ${day}`}
            </Link>
          </li>
        );
      })}
    </ol>
  </div>
);

export default BeginnerStarter;

