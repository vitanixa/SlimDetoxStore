// src/pages/FitnessPage.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const categories = [
  "Cardio", "Strength", "Core", "Yoga", "Mobility",
  "HIIT", "Full Body", "Upper Body", "Lower Body",
  "Stretching", "Pilates", "Dance"
];

const FitnessPage = () => {
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('vitanixa-admin') === 'true');
  const [bookmarked, setBookmarked] = useState(() =>
    JSON.parse(localStorage.getItem('vitanixa-bookmarks') || '[]')
  );

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('fitness_videos')
        .select('*')
        .order('order_index', { ascending: true });
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

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(videos);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setVideos(reordered);
    const updates = reordered.map((v, i) => ({ id: v.id, order_index: i }));
    for (const update of updates) {
      await supabase.from('fitness_videos').update({ order_index: update.order_index }).eq('id', update.id);
    }
  };

  const startEdit = (video) => {
    setEditingId(video.id);
    setEditForm({
      title: video.title ?? '',
      description: video.description ?? '',
      tags: Array.isArray(video.tags) ? video.tags.join(', ') : '',
      category: video.category ?? ''
    });
  };

  const saveEdit = async (id) => {
    const { title, description, tags, category } = editForm;
    const { error } = await supabase.from('fitness_videos').update({
      title, description, tags: tags.split(',').map(t => t.trim()), category
    }).eq('id', id);
    if (!error) {
      const updated = videos.map(v => v.id === id
        ? { ...v, title, description, tags: tags.split(',').map(t => t.trim()), category }
        : v
      );
      setVideos(updated);
      setEditingId(null);
    } else {
      alert('❌ Failed to update video');
    }
  };

  const deleteVideo = async (video) => {
    const confirm = window.confirm(`Are you sure you want to delete "${video.title}"?`);
    if (!confirm) return;
    await supabase.storage.from('fitness-videos').remove([video.filename]);
    await supabase.from('fitness_videos').delete().eq('id', video.id);
    setVideos(videos.filter(v => v.id !== video.id));
  };

  const filtered = videos.filter((v) =>
    (v.title?.toLowerCase().includes(search.toLowerCase()) ||
     v.description?.toLowerCase().includes(search.toLowerCase()) ||
     (Array.isArray(v.tags) && v.tags.join(',').toLowerCase().includes(search.toLowerCase())))
    && (categoryFilter ? v.category === categoryFilter : true)
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((video, index) => (
                <Draggable key={video.id} draggableId={video.id.toString()} index={index} isDragDisabled={!isAdmin}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition-all duration-200">
                      <div className="flex justify-between items-center mb-2">
                        {editingId === video.id ? (
                          <input
                            type="text"
                            className="text-lg font-semibold w-full border-b mb-2"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          />
                        ) : (
                          <h2 className="text-lg font-semibold">{video.title}</h2>
                        )}
                        <button onClick={() => toggleBookmark(video.id)} title="Bookmark">
                          {bookmarked.includes(video.id) ? '⭐' : '☆'}
                        </button>
                      </div>

                      <video
                        controls
                        onPlay={() => handlePlay(video)}
                        className="w-full h-48 rounded mb-3"
                      >
                        <source src={`https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video.filename}`} type="video/mp4" />
                      </video>

                      {editingId === video.id ? (
                        <>
                          <textarea
                            rows="2"
                            placeholder="Edit description..."
                            className="w-full border p-2 rounded mb-2"
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            className="w-full border p-2 rounded mb-2"
                            value={editForm.tags}
                            onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                          />
                          <select
                            className="w-full border p-2 rounded mb-2"
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          >
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600 mb-1">{video.description}</p>
                          {video.category && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2">{video.category}</span>}
                          {Array.isArray(video.tags) && video.tags.length > 0 && (
                            <p className="text-xs text-green-700">Tags: {video.tags.join(', ')}</p>
                          )}
                        </>
                      )}

                      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                        <span>👁 {video.views || 0} views</span>
                        <a
                          href={`https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/${video.filename}`}
                          download
                          className="text-blue-600 hover:underline"
                        >
                          ⬇ Download
                        </a>
                      </div>

                      {isAdmin && (
                        <div className="mt-3 flex gap-3">
                          {editingId === video.id ? (
                            <>
                              <button onClick={() => saveEdit(video.id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                              <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEdit(video)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                              <button onClick={() => deleteVideo(video)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FitnessPage;

