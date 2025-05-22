// src/pages/FitnessPlayer.jsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const videoMetaMap = {
  // BEGINNER STARTER (28)
  ...Array.from({ length: 28 }, (_, i) => {
    const day = i + 1;
    return {
      [`beginner-day${day}.mp4`]: {
        title: `Day ${day}: ${[
          "Foundation Focus",
          "Mobility Flow",
          "Balance Builder",
          "Core Activation",
          "Beginner Strength",
          "Recovery Session",
          "Low Impact Cardio"
        ][i % 7]}`,
        description: [
          "Beginner foundation session to build stability, mobility, and confidence.",
          "Gentle flow to improve joint health and reduce stiffness.",
          "Balance training to increase body awareness and control.",
          "Core workout using breathing and bodyweight.",
          "Low-resistance moves to build strength safely.",
          "Recovery workout to improve form and consistency.",
          "Low-impact cardio to build endurance gently."
        ][i % 7],
        duration: `${12 + (i % 3) * 2} min`,
        program: "beginner-starter",
      },
    };
  }).reduce((acc, obj) => ({ ...acc, ...obj }), {}),

  // STRENGTH BUILDER (21)
  ...Array.from({ length: 21 }, (_, i) => {
    const day = i + 1;
    const phase = ["Strength - Full Body", "Upper Body Blast", "Lower Body Burn", "Core Power"][i % 4];
    const desc = [
      "Compound bodyweight moves to build strength foundation.",
      "Upper body resistance to strengthen arms, shoulders, and chest.",
      "Lower body drills for powerful glutes and legs.",
      "Targeted core exercises to stabilize and build endurance."
    ][i % 4];
    return {
      [`strength-day${day}.mp4`]: {
        title: `Day ${day}: ${phase}`,
        description: desc,
        duration: `${16 + (i % 3) * 2} min`,
        program: "strength-builder",
      },
    };
  }).reduce((acc, obj) => ({ ...acc, ...obj }), {}),

  // FAT BURN BLAST (14)
  ...Array.from({ length: 14 }, (_, i) => {
    const day = i + 1;
    const focus = ["HIIT Focus", "Cardio Focus", "Dance Focus"][i % 3];
    const desc = [
      "High-intensity interval training to spike heart rate.",
      "Cardio training to elevate heart rate, burn fat, and boost endurance.",
      "Dance training to elevate heart rate, burn fat, and boost endurance."
    ][i % 3];
    return {
      [`fatburn-day${day}.mp4`]: {
        title: `Day ${day}: ${focus}`,
        description: desc,
        duration: `${14 + (i % 3) * 2} min`,
        program: "fat-burn-blast",
      },
    };
  }).reduce((acc, obj) => ({ ...acc, ...obj }), {}),

  // CALM & CORE YOGA (21)
  ...Array.from({ length: 21 }, (_, i) => {
    const day = i + 1;
    const focus = ["Gentle Flow", "Core Stability", "Mindful Mobility"][i % 3];
    const desc = [
      "Breath-centered movement for calm and control.",
      "Deep core engagement to support spine and posture.",
      "Mobility practice to improve fluidity and joint function."
    ][i % 3];
    return {
      [`calm-day${day}.mp4`]: {
        title: `Day ${day}: ${focus}`,
        description: desc,
        duration: `${15 + (i % 3) * 2} min`,
        program: "calm-core-yoga",
      },
    };
  }).reduce((acc, obj) => ({ ...acc, ...obj }), {}),
};

const FitnessPlayer = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const video = params.get('video');

  const meta = videoMetaMap[video] || {
    title: video || 'Workout Video',
    description: 'No description available.',
    duration: '',
    program: '',
  };

  const videoUrl = `https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video}`;
  const backLink = meta.program ? `/fitness/programs/${meta.program}` : '/fitness';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to={backLink}
        className="text-sm text-green-700 hover:underline inline-block mb-4"
      >
        ← Back to {meta.program.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
      </Link>

      <h1 className="text-2xl font-bold mb-2">{meta.title}</h1>
      <p className="text-sm text-gray-600 mb-1">{meta.duration && `Duration: ${meta.duration}`}</p>

      <video
        controls
        className="w-full h-auto rounded mb-4 mt-2"
        src={videoUrl}
      />

      <p className="text-sm text-gray-700">{meta.description}</p>
    </div>
  );
};

export default FitnessPlayer;

