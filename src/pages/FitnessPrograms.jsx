import React from 'react';
import { Link } from 'react-router-dom';

const programs = [
  {
    title: "Beginner 4-Week Starter",
    slug: "beginner-starter",
    weeks: 4,
    focus: "Foundation, Cardio, Strength, Flexibility",
    description: "A progressive beginner-friendly program designed to build consistency and whole-body strength over 4 weeks.",
  },
  {
    title: "2-Week Fat Burn Blast",
    slug: "fat-burn-blast",
    weeks: 2,
    focus: "HIIT, Dance, Core",
    description: "Short on time? This 14-day plan helps you sweat, torch calories, and boost metabolism fast.",
  },
  {
    title: "21-Day Strength Builder",
    slug: "strength-builder",
    weeks: 3,
    focus: "Strength, Core, Upper/Lower Body",
    description: "Build lean strength, body control, and muscle tone using bodyweight and light resistance training.",
  },
  {
    title: "Calm & Core Yoga Journey",
    slug: "calm-core-yoga",
    weeks: 3,
    focus: "Yoga, Core, Mobility",
    description: "A relaxing but effective program to strengthen your center, improve balance, and calm the nervous system.",
  },
];

const FitnessPrograms = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Vitanixa Programs</h1>
      <p className="text-gray-600 mb-8">Follow a structured plan for better results and motivation. Choose a program that suits your goals:</p>
      <div className="grid md:grid-cols-2 gap-6">
        {programs.map((prog) => (
          <div key={prog.slug} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2">{prog.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{prog.description}</p>
            <p className="text-xs text-blue-700 mb-3">Focus: {prog.focus}</p>
            <Link
              to={`/fitness/programs/${prog.slug}`}
              className="inline-block bg-green-700 text-white px-4 py-2 text-sm rounded hover:bg-green-800"
            >
              View Program
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessPrograms;