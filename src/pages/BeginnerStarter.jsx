import React from 'react';
import { Link } from 'react-router-dom';

const beginnerDays = [
  { day: 1, title: 'Foundation Build', desc: 'Gentle full-body movements to build coordination and strength.' },
  { day: 2, title: 'Core Stability', desc: 'Engage your center for better balance and mobility.' },
  { day: 3, title: 'Mobility Reset', desc: 'Loosen joints and reduce stiffness.' },
  { day: 4, title: 'Endurance Lite', desc: 'Cardio-based flow for energy without burnout.' },
  { day: 5, title: 'Balance Booster', desc: 'Improve your control with single-leg and dynamic balance drills.' },
  { day: 6, title: 'Recovery Flow', desc: 'Deep stretching and mindful movement.' },
  { day: 7, title: 'Posture Primer', desc: 'Work on spinal alignment and upright posture.' },
  { day: 8, title: 'Foundation Build', desc: 'Gentle full-body movements to build coordination and strength.' },
  { day: 9, title: 'Core Stability', desc: 'Engage your center for better balance and mobility.' },
  { day: 10, title: 'Mobility Reset', desc: 'Loosen joints and reduce stiffness.' },
  { day: 11, title: 'Endurance Lite', desc: 'Cardio-based flow for energy without burnout.' },
  { day: 12, title: 'Balance Booster', desc: 'Improve your control with single-leg and dynamic balance drills.' },
  { day: 13, title: 'Recovery Flow', desc: 'Deep stretching and mindful movement.' },
  { day: 14, title: 'Posture Primer', desc: 'Work on spinal alignment and upright posture.' },
  { day: 15, title: 'Foundation Build', desc: 'Gentle full-body movements to build coordination and strength.' },
  { day: 16, title: 'Core Stability', desc: 'Engage your center for better balance and mobility.' },
  { day: 17, title: 'Mobility Reset', desc: 'Loosen joints and reduce stiffness.' },
  { day: 18, title: 'Endurance Lite', desc: 'Cardio-based flow for energy without burnout.' },
  { day: 19, title: 'Balance Booster', desc: 'Improve your control with single-leg and dynamic balance drills.' },
  { day: 20, title: 'Recovery Flow', desc: 'Deep stretching and mindful movement.' },
  { day: 21, title: 'Posture Primer', desc: 'Work on spinal alignment and upright posture.' },
  { day: 22, title: 'Foundation Build', desc: 'Gentle full-body movements to build coordination and strength.' },
  { day: 23, title: 'Core Stability', desc: 'Engage your center for better balance and mobility.' },
  { day: 24, title: 'Mobility Reset', desc: 'Loosen joints and reduce stiffness.' },
  { day: 25, title: 'Endurance Lite', desc: 'Cardio-based flow for energy without burnout.' },
  { day: 26, title: 'Balance Booster', desc: 'Improve your control with single-leg and dynamic balance drills.' },
  { day: 27, title: 'Recovery Flow', desc: 'Deep stretching and mindful movement.' },
  { day: 28, title: 'Posture Primer', desc: 'Work on spinal alignment and upright posture.' }
];

const BeginnerStarter = () => (
  <div className="max-w-4xl mx-auto p-6">
    <Link
      to="/fitness/programs"
      className="text-sm text-green-700 hover:underline mb-4 inline-block"
    >
      ← Back to All Programs
    </Link>
    <h1 className="text-3xl font-bold mb-2">Beginner Starter</h1>
    <p className="text-gray-600 mb-6">
      Perfect for beginners — build balance, strength, and endurance in just 4 weeks.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {beginnerDays.map(({ day, title, desc }) => {
        const filename = `beginnerstarter-day${day}.mp4`;
        return (
          <div key={day} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-1">Day {day}: {title}</h2>
            <p className="text-sm text-gray-700 mb-2">{desc}</p>
            <Link
              to={`/fitness/player?video=${filename}&program=beginner-starter`}
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

export default BeginnerStarter;

