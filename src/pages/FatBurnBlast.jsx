// src/pages/FatBurnBlast.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FatBurnBlast = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Fat Burn Blast</h1>
    <p className="text-gray-600 mb-4">2 weeks of high-energy cardio and HIIT to ignite your metabolism.</p>

    <ol className="list-decimal ml-6 space-y-2">
      {Array.from({ length: 14 }, (_, i) => {
        const day = i + 1;
        const style = ['HIIT', 'Cardio', 'Dance'][i % 3];
        const filename = `fatburn-day${day}.mp4`;
        return (
          <li key={day}>
            <strong>Day {day}:</strong>{' '}
            <Link
              to={`/fitness?video=${filename}`}
              className="text-green-700 hover:underline"
            >
              {`Fat Burn Blast - ${style} Day ${day}`}
            </Link>
          </li>
        );
      })}
    </ol>
  </div>
);

export default FatBurnBlast;

