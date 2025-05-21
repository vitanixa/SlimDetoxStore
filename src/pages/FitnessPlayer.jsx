// src/pages/FitnessPlayer.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FitnessPlayer = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const video = params.get('video');
  const program = params.get('program');

  const videoUrl = `https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video}`;

  const goBackLink = program ? `/fitness/programs/${program}` : '/fitness';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(goBackLink)}
        className="mb-4 text-green-700 hover:underline text-sm"
      >
        ← Back to Program
      </button>

      <h1 className="text-2xl font-bold mb-4">{video.replace('.mp4', '').replace(/-/g, ' ')}</h1>

      <video controls className="w-full rounded shadow mb-4">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FitnessPlayer;

