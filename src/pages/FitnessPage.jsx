import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const FitnessPage = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from('fitness_videos').select('*');
      if (!error) {
        setVideos(data);
      }
    };

    fetchVideos();
  }, []);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.description.toLowerCase().includes(search.toLowerCase()) ||
    (v.tags && v.tags.toString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Vitanixa Fitness</h1>
      <p className="text-gray-600 mb-6">Train your body. Transform your energy. AI-powered fitness videos to guide your journey.</p>

      <input
        type="text"
        placeholder="Search workouts..."
        className="border px-4 py-2 mb-6 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && <p className="text-gray-500">No workouts match your search.</p>}

      <div className="grid md:grid-cols-2 gap-8">
        {filtered.map((video, i) => (
          <div key={i} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
            <video controls className="w-full h-64 rounded mb-2">
              <source src={`/videos/${video.filename}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-sm text-gray-600">{video.description}</p>
            {video.tags && (
              <p className="text-xs text-green-700 mt-1">
                Tags: {video.tags.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessPage;

