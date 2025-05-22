import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// Import your grouped metadata object
import metadata from '../data/vitanixa_fitness_metadata.json';

const FitnessPlayer = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const video = params.get('video');
  const program = params.get('program');

  const videoUrl = `https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video}`;
  const programLink = program ? `/fitness/programs/${program}` : '/fitness';

  // 🔍 Search across all program arrays to find the matching filename
  let videoMeta = null;
  for (const group of Object.values(metadata)) {
    const match = group.find(entry => entry.Filename.toLowerCase() === video?.toLowerCase());
    if (match) {
      videoMeta = match;
      break;
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to={programLink}
        className="text-sm text-green-700 hover:underline mb-4 inline-block"
      >
        ← Back to {program?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Fitness'}
      </Link>

      <h1 className="text-2xl font-bold mb-2">
        {videoMeta?.Title || 'Workout Player'}
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
          <p className="text-gray-700 text-sm mb-1">{videoMeta.Description}</p>
          <p className="text-xs text-gray-500">Duration: {videoMeta.Duration} min</p>
        </>
      ) : (
        <p className="text-sm text-gray-500">No metadata found for this video.</p>
      )}
    </div>
  );
};

export default FitnessPlayer;

