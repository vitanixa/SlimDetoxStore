import React from 'react';
import { Link } from 'react-router-dom';

const fatBurnDays = [
  { day: 1, title: 'HIIT Ignite', desc: 'Explosive intervals to jumpstart metabolism and improve cardio capacity.' },
  { day: 2, title: 'Endurance Cardio', desc: 'Sustained movement to build stamina and burn calories.' },
  { day: 3, title: 'Dance Burnout', desc: 'Fun, rhythmic combos to torch fat through nonstop movement.' },
  { day: 4, title: 'Power HIIT', desc: 'Short rests, big pushes — train intensity and recovery.' },
  { day: 5, title: 'Athletic Cardio', desc: 'Agility and tempo drills to enhance coordination and shred fat.' },
  { day: 6, title: 'Latin Dance Cardio', desc: 'Spicy footwork and rhythm — burn while having fun.' },
  { day: 7, title: 'Core HIIT Circuit', desc: 'Cardio meets abs — elevate heart rate while tightening the core.' },
  { day: 8, title: 'Step Cardio', desc: 'Low-impact combos that challenge coordination and heart rate.' },
  { day: 9, title: 'Hip-Hop Fat Burn', desc: 'High-energy moves to music that keeps you moving.' },
  { day: 10, title: 'Tabata HIIT', desc: 'Maximum intensity in short bursts — train like an athlete.' },
  { day: 11, title: 'Kickbox Cardio', desc: 'Punch, jab, and sweat your way to endurance and power.' },
  { day: 12, title: 'Afrobeat Dance Blast', desc: 'Flow with dynamic Afro moves to sculpt and sweat.' },
  { day: 13, title: 'Plyo HIIT', desc: 'Jump-based HIIT to activate legs and burn calories faster.' },
  { day: 14, title: 'Ultimate Burnout', desc: 'Full-body finisher — celebrate with the hardest burn yet.' }
];

const FatBurnBlast = () => (
  <div className="max-w-4xl mx-auto p-6">
    <Link
      to="/fitness/programs"
      className="text-sm text-green-700 hover:underline mb-4 inline-block"
    >
      ← Back to All Programs
    </Link>
    <h1 className="text-3xl font-bold mb-2">Fat Burn Blast</h1>
    <p className="text-gray-600 mb-6">
      A 14-day high-intensity challenge alternating HIIT, cardio, and dance workouts to rev up metabolism and burn fat fast.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {fatBurnDays.map(({ day, title, desc }) => {
        const filename = `fatburnblast-day${day}.mp4`;
        return (
          <div key={day} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-1">Day {day}: {title}</h2>
            <p className="text-sm text-gray-700 mb-2">{desc}</p>
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

