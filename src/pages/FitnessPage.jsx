import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const categories = [
  "Cardio", "Strength", "Core", "Yoga", "Mobility",
  "HIIT", "Full Body", "Upper Body", "Lower Body",
  "Stretching", "Pilates", "Dance"
];

const FitnessPage = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('vitanixa-admin') === 'true');
  const [bookmarked, setBookmarked] = useState(() => JSON.parse(localStorage.getItem('vitanixa-bookmarks') || '[]'));

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from('fitness_videos').select('*');
      if (!error) setVideos(data);
    };
    fetchVideos();
  }, []);

  const toggleBookmark = (id) => {
    const updated = bookmarked.includes(id)
      ? bookmarked.filter(b => b !== id)
      : [...bookmarked, id];
    setBookmarked(updated);
    localStorage.setItem('vitanixa-bookmarks', JSON.stringify(updated));
  };

  const handlePlay = async (video) => {
    await supabase.from('fitness_videos')
      .update({ views: (video.views || 0) + 1 })
      .eq('id', video.id);
  };

  const handleEdit = async (video) => {
    const newTitle = prompt('New title:', video.title);
    const newDesc = prompt('New description:', video.description);
    const newTags = prompt('Tags (comma-separated):', video.tags?.join(', '));
    const newCategory = prompt('Category:', video.category || '');

    if (newTitle && newDesc && newTags && newCategory) {
      const { error } = await supabase.from('fitness_videos').update({
        title: newTitle,
        description: newDesc,
        tags: newTags.split(',').map(t => t.trim()),
        category: newCategory
      }).eq('id', video.id);
      if (!error) {
        alert('✅ Updated!');
        setVideos((prev) => prev.map(v => v.id === video.id ? { ...v, title: newTitle, description: newDesc, tags: newTags.split(',').map(t => t.trim()), category: newCategory } : v));
      }
    }
  };

  const filtered = videos.filter((v) => {
    const matchSearch = v.title?.toLowerCase().includes(search.toLowerCase()) ||
      v.description?.toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(v.tags) && v.tags.join(',').toLowerCase().includes(search.toLowerCase()));
    const matchCategory = categoryFilter ? v.category === categoryFilter : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Vitanixa Fitness</h1>
        {!isAdmin ? (
          <button onClick={() => {
            const pass = prompt('Admin passcode:');
            if (pass === 'vitanixa123') {
              localStorage.setItem('vitanixa-admin', 'true');
              setIsAdmin(true);
            }
          }} className="text-sm bg-gray-200 px-4 py-1 rounded">Admin Login</button>
        ) : (
          <button onClick={() => {
            localStorage.removeItem('vitanixa-admin');
            setIsAdmin(false);
          }} className="text-sm bg-red-100 px-4 py-1 rounded text-red-700">Logout</button>
        )}
      </div>

      <input
        type="text"
        className="border p-2 w-full mb-4 rounded"
        placeholder="Search workouts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 mb-6 rounded"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(video => (
          <div key={video.id} className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <button onClick={() => toggleBookmark(video.id)} title="Bookmark">
                {bookmarked.includes(video.id) ? '⭐' : '☆'}
              </button>
            </div>

            <video
              controls
              onPlay={() => handlePlay(video)}
              className="w-full h-64 rounded my-3"
            >
              <source src={`https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video.filename}`} type="video/mp4" />
            </video>

            <p className="text-sm text-gray-600 mb-1">{video.description}</p>
            {video.category && <p className="text-xs mb-1 text-blue-700">Category: {video.category}</p>}
            {Array.isArray(video.tags) && video.tags.length > 0 && (
              <p className="text-xs text-green-700">Tags: {video.tags.join(', ')}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">Views: {video.views || 0}</p>

            <div className="flex gap-3 mt-3">
              <a
                href={`https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video.filename}`}
                download
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Download
              </a>
              {isAdmin && (
                <button
                  onClick={() => handleEdit(video)}
                  className="text-sm bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessPage;
