// src/pages/FatBurnBlast.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const fatBurnDays = [
  { day: 1, title: "HIIT Burn", description: "10-min HIIT to spike your metabolism and burn calories.", filename: "fatburn-day1.mp4" },
  { day: 2, title: "Cardio Sweat", description: "Steady cardio with fun moves to elevate heart rate.", filename: "fatburn-day2.mp4" },
  { day: 3, title: "Dance Blast", description: "Follow-along dance routine to keep the burn fun!", filename: "fatburn-day3.mp4" },
  { day: 4, title: "HIIT Sculpt", description: "Quick intervals with bodyweight resistance training.", filename: "fatburn-day4.mp4" },
  { day: 5, title: "Cardio Burn", description: "Low-impact, steady pace cardio day.", filename: "fatburn-day5.mp4" },
  { day: 6, title: "Dance HIIT", description: "Dance-inspired HIIT bursts to sweat and smile.", filename: "fatburn-day6.mp4" },
  { day: 7, title: "Recovery Stretch", description: "Gentle stretching to help muscles recover.", filename: "fatburn-day7.mp4" },
  { day: 8, title: "HIIT Core", description: "HIIT circuits focusing on core and abs.", filename: "fatburn-day8.mp4" },
  { day: 9, title: "Fat Burn March", description: "No-jump cardio to maintain fat burn rhythm.", filename: "fatburn-day9.mp4" },
  { day: 10, title: "Cardio Kick", description: "Kickboxing cardio to build confidence and burn fat.", filename: "fatburn-day10.mp4" },
  { day: 11, title: "HIIT Tabata", description: "Tabata-style HIIT for maximum fat shredding.", filename: "fatburn-day11.mp4" },
  { day: 12, title: "Dance Flow", description: "Choreo-based cardio to boost endorphins and sweat.", filename: "fatburn-day12.mp4" },
  { day: 13, title: "Body Burn", description: "Full bodyweight circuit — no equipment, just effort.", filename: "fatburn-day13.mp4" },
  { day: 14, title: "Celebrate Burn", description: "Final day flow — combine HIIT, cardio, dance!", filename: "fatburn-day14.mp4" },
];

const FatBurnBlast = () => (
  <div className="max-w-5xl mx-auto p-6">
    <Link
      to="/fitness/programs"
      className="text-sm text-green-700 underline mb-4 inline-block"
    >
      ← Back to Programs
    </Link>

    <h1 className="text-3xl font-bold mb-2">🔥 Fat Burn Blast</h1>
    <p className="text-gray-600 mb-6">
      A 14-day high-intensity challenge alternating HIIT, cardio, and dance workouts to rev up metabolism and burn fat fast.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {fatBurnDays.map(({ day, title, description, filename }) => (
        <div key={day} className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-1">Day {day}: {title}</h2>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <Link
            to={`/fitness?video=${filename}`}
            className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            ▶ Watch Now
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default FatBurnBlast;

