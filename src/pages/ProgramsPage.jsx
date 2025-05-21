import React from 'react';
import { Link } from 'react-router-dom';

const ProgramsPage = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">🏋️‍♀️ Fitness Programs</h1>
    <p className="mb-4 text-gray-600">Choose a guided program below. Each includes daily video workouts linked from your library.</p>

    <div className="grid gap-4">
      <Link to="/fitness/programs/fatburn" className="block p-4 bg-white rounded shadow hover:bg-gray-50">
        🔥 2-Week Fat Burn Blast
      </Link>
      <Link to="/fitness/programs/strength" className="block p-4 bg-white rounded shadow hover:bg-gray-50">
        💪 21-Day Strength Builder
      </Link>
      <Link to="/fitness/programs/beginner" className="block p-4 bg-white rounded shadow hover:bg-gray-50">
        🔰 Beginner 4-Week Starter
      </Link>
      <Link to="/fitness/programs/calm" className="block p-4 bg-white rounded shadow hover:bg-gray-50">
        🧘 Calm & Core Yoga Journey
      </Link>
    </div>
  </div>
);

export default ProgramsPage;