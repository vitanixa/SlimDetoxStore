import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const FitnessPlayer = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const video = params.get('video');
  const program = params.get('program');

  const videoUrl = `https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video}`;
  const goBackLink = program ? `/fitness/programs/${program}` : '/fitness';

  const title = video
    ?.replace('.mp4', '')
    ?.replace(/-/g, ' ')
    ?.replace(/\b\w/g, l => l.toUpperCase());

  // Map: filename => { description, duration }
  const descriptions = {
    // Fat Burn Blast
    ...[
      'HIIT', 'Cardio', 'Dance',
      'HIIT', 'Cardio', 'Dance',
      'HIIT', 'Cardio', 'Dance',
      'HIIT', 'Cardio', 'Dance',
      'HIIT', 'Cardio'
    ].reduce((acc, focus, i) => {
      const filename = `fatburn-day${i + 1}.mp4`;
      acc[filename] = {
        description: `${focus} workout to elevate heart rate, burn fat, and boost endurance.`,
        duration: '12 min',
      };
      return acc;
    }, {}),

    // Strength Builder
    ...[
      'Full Body power workout using bodyweight resistance.',
      'Strengthen shoulders, chest, and arms.',
      'Squats, lunges, and glutes-focused power.',
      'Planks, crunches, and rotation work.',
    ].flatMap((desc, i) =>
      Array.from({ length: 6 }).map((_, j) => {
        const day = i + 1 + j * 4;
        return [`strength-day${day}.mp4`, {
          description: desc,
          duration: '15 min'
        }];
      })
    ).reduce((acc, [k, v]) => (acc[k] = v, acc), {}),

    // Beginner Starter
    ...Array.from({ length: 28 }, (_, i) => {
      const day = i + 1;
      return [`beginner-day${day}.mp4`, {
        description: `Day ${day}: Beginner foundation session to build stability, mobility, and confidence.`,
        duration: '10 min'
      }];
    }).reduce((acc, [k, v]) => (acc[k] = v, acc), {}),

    // Calm & Core Yoga
    ...Array.from({ length: 21 }, (_, i) => {
      const day = i + 1;
      return [`calmcore-day${day}.mp4`, {
        description: `Day ${day}: Yoga and mindful core flow for flexibility, balance, and breath.`,
        duration: '15 min'
      }];
    }).reduce((acc, [k, v]) => (acc[k] = v, acc), {}),
  };

  const meta = descriptions[video] || {
    description: 'This is part of your structured fitness program.',
    duration: ''
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to={goBackLink}
        className="text-sm text-green-700 hover:underline mb-4 inline-block"
      >
        ← Back to Program
      </Link>

      <h1 className="text-2xl font-bold mb-2">{title}</h1>

      <video
        controls
        className="w-full h-auto rounded mb-4"
        src={videoUrl}
      />

      <p className="text-sm text-gray-700 mb-2">{meta.description}</p>
      {meta.duration && (
        <p className="text-xs text-gray-500">⏱ Duration: {meta.duration}</p>
      )}
    </div>
  );
};

export default FitnessPlayer;

