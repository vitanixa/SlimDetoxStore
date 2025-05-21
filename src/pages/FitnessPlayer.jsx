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
      <Link
        to={`/fitness/programs/${programSlug}`}
        className="text-sm text-green-700 hover:underline mb-4 inline-block"
      >
        ← Back to {programSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Link>

      <h1 className="text-2xl font-bold mb-2">{videoMeta.title}</h1>

      <video
        controls
        className="w-full h-auto rounded mb-4"
        src={videoUrl}
      />

      <p className="text-sm text-gray-700">{videoMeta.description}</p>
    </div>
  );
};

export default FitnessPlayer;

