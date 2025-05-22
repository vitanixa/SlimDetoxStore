import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// Load enriched metadata from generated JSON
import metadata from '../data/vitanixa_fitness_metadata.json';

const FitnessPlayer = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const video = params.get('video');
  const program = params.get('program');

  const videoUrl = `https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video}`;
  const programLink = program ? `/fitness/programs/${program}` : '/fitness';

  // Match video metadata
  const videoMeta = metadata.find((entry) => entry.filename === video);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to={programLink}
        className="text-sm text-green-700 hover:underline mb-4 inline-block"
      >
        ← Back to {program?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Fitness'}
      </Link>

      <h1 className="text-2xl font-bold mb-2">
        {videoMeta?.title || 'Workout Player'}
      </h1>

      <video
        controls
        className="w-full h-auto rounded mb-4"
        src={videoUrl}
      >
        Sorry, your browser doesn't support this video.
      </video>

      {videoMeta ? (
        <>
          <p className="text-gray-700 text-sm mb-1">{videoMeta.description}</p>
          <p className="text-xs text-gray-500">Duration: {videoMeta.duration} min</p>
        </>
      ) : (
        <p className="text-sm text-gray-500">
          No metadata available for this video.
        </p>
      )}
    </div>
  );
};
console.log('✅ Loaded metadata entries:', metadata.length);

export default FitnessPlayer;

