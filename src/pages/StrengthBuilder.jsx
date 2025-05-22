import React from 'react';
import { Link } from 'react-router-dom';

const strengthDays = [
  { day: 1, title: 'Full Body Strength', desc: 'Foundational strength session focusing on all major muscle groups.' },
  { day: 2, title: 'Upper Body Power', desc: 'Strengthen shoulders, chest, and arms using bodyweight resistance.' },
  { day: 3, title: 'Lower Body Load', desc: 'Leg-focused training for tone, power, and balance.' },
  { day: 4, title: 'Core Reinforcement', desc: 'Target abs, obliques, and back to stabilize and sculpt.' },
  { day: 5, title: 'Endurance Burn', desc: 'Slow controlled sets to improve strength endurance.' },
  { day: 6, title: 'Push Day', desc: 'Push-focused sets for chest, triceps, and shoulders.' },
  { day: 7, title: 'Pull Day', desc: 'Pull-focused exercises to hit back and biceps.' },
  { day: 8, title: 'Full Body Strength', desc: 'Foundational strength session focusing on all major muscle groups.' },
  { day: 9, title: 'Upper Body Power', desc: 'Strengthen shoulders, chest, and arms using bodyweight resistance.' },
  { day: 10, title: 'Lower Body Load', desc: 'Leg-focused training for tone, power, and balance.' },
  { day: 11, title: 'Core Reinforcement', desc: 'Target abs, obliques, and back to stabilize and sculpt.' },
  { day: 12, title: 'Endurance Burn', desc: 'Slow controlled sets to improve strength endurance.' },
  { day: 13, title: 'Push Day', desc: 'Push-focused sets for chest, triceps, and shoulders.' },
  { day: 14, title: 'Pull Day', desc: 'Pull-focused exercises to hit back and biceps.' },
  { day: 15, title: 'Full Body Strength', desc: 'Foundational strength session focusing on all major muscle groups.' },
  { day: 16, title: 'Upper Body Power', desc: 'Strengthen shoulders, chest, and arms using bodyweight resistance.' },
  { day: 17, title: 'Lower Body Load', desc: 'Leg-focused training for tone, power, and balance.' },
  { day: 18, title: 'Core Reinforcement', desc: 'Target abs, obliques, and back to stabilize and sculpt.' },
  { day: 19, title: 'Endurance Burn', desc: 'Slow controlled sets to improve strength endurance.' },
  { day: 20, title: 'Push Day', desc: 'Push-focused sets for chest, triceps, and shoulders.' },
  { day: 21, title: 'Pull Day', desc: 'Pull-focused exercises to hit back and biceps.' }
];

const StrengthBuilder = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-2">Strength Builder</h1>
    <p className="text-gray-600 mb-6">
      21 days of progressive resistance and bodyweight training to build lean muscle.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {strengthDays.map(({ day, title, desc }) => {
        const filename = `strengthbuilder-day${day}.mp4`;
        return (
          <div key={day} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-1">Day {day}: {title}</h2>
            <p className="text-sm text-gray-700 mb-2">{desc}</p>
            <Link
              to={`/fitness/player?video=${filename}&program=strength-builder`}
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

export default StrengthBuilder;

