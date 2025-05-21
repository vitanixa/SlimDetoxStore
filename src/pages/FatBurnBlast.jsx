import React from 'react';
import { Link } from 'react-router-dom';

const FatBurnBlast = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Fat Burn Blast</h1>
    <p className="text-gray-600 mb-4">Follow this structured daily workout plan. Each link takes you to the workout player.</p>
    <ol className="list-decimal ml-6">
      <li className="mb-2">
        <strong>Day 1:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - HIIT Day 1</Link>
      </li>
      <li className="mb-2">
        <strong>Day 2:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Cardio Day 2</Link>
      </li>
      <li className="mb-2">
        <strong>Day 3:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Dance Day 3</Link>
      </li>
      <li className="mb-2">
        <strong>Day 4:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Core Day 4</Link>
      </li>
      <li className="mb-2">
        <strong>Day 5:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - HIIT Day 5</Link>
      </li>
      <li className="mb-2">
        <strong>Day 6:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Cardio Day 6</Link>
      </li>
      <li className="mb-2">
        <strong>Day 7:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Dance Day 7</Link>
      </li>
      <li className="mb-2">
        <strong>Day 8:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Core Day 8</Link>
      </li>
      <li className="mb-2">
        <strong>Day 9:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - HIIT Day 9</Link>
      </li>
      <li className="mb-2">
        <strong>Day 10:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Cardio Day 10</Link>
      </li>
      <li className="mb-2">
        <strong>Day 11:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Dance Day 11</Link>
      </li>
      <li className="mb-2">
        <strong>Day 12:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Core Day 12</Link>
      </li>
      <li className="mb-2">
        <strong>Day 13:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - HIIT Day 13</Link>
      </li>
      <li className="mb-2">
        <strong>Day 14:</strong> <Link to={`/fitness?video=${entry.filename}`} className="text-green-700 hover:underline">Fat Burn Blast - Cardio Day 14</Link>
      </li>
    </ol>
  </div>
);

export default FatBurnBlast;