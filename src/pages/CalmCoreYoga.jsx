import React from 'react';
import { Link } from 'react-router-dom';

const calmYogaDays = [
  { day: 1, title: 'Mindful Flow', desc: 'Calm sequences to connect breath and movement.' },
  { day: 2, title: 'Power Yoga', desc: 'Vinyasa flow with strength-building holds.' },
  { day: 3, title: 'Core Stability', desc: 'Engage your center with slow, strong poses.' },
  { day: 4, title: 'Hip Opening', desc: 'Release tight hips and improve flexibility.' },
  { day: 5, title: 'Spinal Mobility', desc: 'Twists and bends for a healthy spine.' },
  { day: 6, title: 'Balance & Focus', desc: 'Poses to sharpen focus and enhance body awareness.' },
  { day: 7, title: 'Yin Recovery', desc: 'Deep hold stretches to restore muscles.' },
  { day: 8, title: 'Mindful Flow', desc: 'Calm sequences to connect breath and movement.' },
  { day: 9, title: 'Power Yoga', desc: 'Vinyasa flow with strength-building holds.' },
  { day: 10, title: 'Core Stability', desc: 'Engage your center with slow, strong poses.' },
  { day: 11, title: 'Hip Opening', desc: 'Release tight hips and improve flexibility.' },
  { day: 12, title: 'Spinal Mobility', desc: 'Twists and bends for a healthy spine.' },
  { day: 13, title: 'Balance & Focus', desc: 'Poses to sharpen focus and enhance body awareness.' },
  { day: 14, title: 'Yin Recovery', desc: 'Deep hold stretches to restore muscles.' },
  { day: 15, title: 'Mindful Flow', desc: 'Calm sequences to connect breath and movement.' },
  { day: 16, title: 'Power Yoga', desc: 'Vinyasa flow with strength-building holds.' },
  { day: 17, title: 'Core Stability', desc: 'Engage your center with slow, strong poses.' },
  { day: 18, title: 'Hip Opening', desc: 'Release tight hips and improve flexibility.' },
  { day: 19, title: 'Spinal Mobility', desc: 'Twists and bends for a healthy spine.' },
  { day: 20, title: 'Balance & Focus', desc: 'Poses to sharpen focus and enhance body awareness.' },
  { day: 21, title: 'Yin Recovery', desc: 'Deep hold stretches to restore muscles.' }
];

const CalmCoreYoga = () => (
  <div className="max-w-4xl mx-auto p-6">
    <Link
      to="/fitness/programs"
      className="text-sm text-green-700 hover:underline mb-4 inline-block"
    >
      ← Back to All Programs
    </Link>
    <h1 className="text-3xl font-bold mb-2">Calm & Core Yoga</h1>
    <p className="text-gray-600 mb-6">
      Flow-based yoga program to strengthen the core, improve flexibility, and calm the mind.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {calmYogaDays.map(({ day, title, desc }) => {
        const filename = `calm&coreyoga-day${day}.mp4`;
        return (
          <div key={day} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-1">Day {day}: {title}</h2>
            <p className="text-sm text-gray-700 mb-2">{desc}</p>
            <Link
              to={`/fitness/player?video=${filename}&program=calm-core-yoga`}
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

export default CalmCoreYoga;

