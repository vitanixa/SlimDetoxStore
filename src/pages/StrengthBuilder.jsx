// src/pages/StrengthBuilder.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const strengthDays = [
  { day: 1, title: "Full Body Intro", description: "Introductory strength routine using bodyweight movements.", filename: "strength-day1.mp4" },
  { day: 2, title: "Upper Body Tone", description: "Focus on arms, shoulders, and chest with slow control.", filename: "strength-day2.mp4" },
  { day: 3, title: "Lower Body Power", description: "Legs and glutes circuit to build foundational strength.", filename: "strength-day3.mp4" },
  { day: 4, title: "Core Strength", description: "Ab-focused strength with planks and holds.", filename: "strength-day4.mp4" },
  { day: 5, title: "Bodyweight Burn", description: "Full-body strength circuit with timed intervals.", filename: "strength-day5.mp4" },
  { day: 6, title: "Arms + Shoulders", description: "Isometric and active upper body session.", filename: "strength-day6.mp4" },
  { day: 7, title: "Leg Day Express", description: "Low-impact, high-burn leg and glute workout.", filename: "strength-day7.mp4" },
  { day: 8, title: "Strong Core Flow", description: "Core training blended with light movement flow.", filename: "strength-day8.mp4" },
  { day: 9, title: "Full Body Challenge", description: "Push your strength endurance with no equipment.", filename: "strength-day9.mp4" },
  { day: 10, title: "Push + Pull", description: "Upper body compound movements to build power.", filename: "strength-day10.mp4" },
  { day: 11, title: "Leg Stability", description: "Improve balance and strength through control.", filename: "strength-day11.mp4" },
  { day: 12, title: "Core Control", description: "Plank and crunch-based challenge for abs.", filename: "strength-day12.mp4" },
  { day: 13, title: "Explosive Power", description: "Dynamic full-body movements to develop strength.", filename: "strength-day13.mp4" },
  { day: 14, title: "Upper Burnout", description: "Intense arms, back, and chest day.", filename: "strength-day14.mp4" },
  { day: 15, title: "Leg Burnout", description: "High-rep leg sets for max endurance.", filename: "strength-day15.mp4" },
  { day: 16, title: "Core and Glutes", description: "Target abs and glutes with controlled movement.", filename: "strength-day16.mp4" },
  { day: 17, title: "Body Strength Flow", description: "Total body strength and flexibility circuit.", filename: "strength-day17.mp4" },
  { day: 18, title: "Upper Endurance", description: "Build muscle stamina with time-under-tension sets.", filename: "strength-day18.mp4" },
  { day: 19, title: "Lower Sculpt", description: "Calisthenics-style leg and hip training.", filename: "strength-day19.mp4" },
  { day: 20, title: "Strong Core Max", description: "Max core effort day — full ab circuit.", filename: "strength-day20.mp4" },
  { day: 21, title: "Victory Flow", description: "Celebrate strength gains with movement and recovery.", filename: "strength-day21.mp4" },
];

const StrengthBuilder = () => (
  <div className="max-w-5xl mx-auto p-6">
    <Link to="/fitness/programs" className="text-sm text-green-700 underline mb-4 inline-block">
      ← Back to Programs
    </Link>

    <h1 className="text-3xl font-bold mb-2">💪 Strength Builder</h1>
    <p className="text-gray-600 mb-6">
      A 21-day progressive resistance journey. Use your body weight to develop muscle, endurance, and balance.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {strengthDays.map(({ day, title, description, filename }) => (
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

export default StrengthBuilder;

