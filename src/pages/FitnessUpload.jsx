// src/pages/FitnessUpload.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const categories = [
  "Cardio", "Strength", "Core", "Yoga", "Mobility",
  "HIIT", "Full Body", "Upper Body", "Lower Body",
  "Stretching", "Pilates", "Dance"
];

const FitnessUpload = () => {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('vitanixa-admin') === 'true');
  const [passcode, setPasscode] = useState('');
  const [form, setForm] = useState({
    title: '',
    filename: '',
    description: '',
    tags: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    if (passcode === 'vitanixa123') {
      setAuthenticated(true);
      localStorage.setItem('vitanixa-admin', 'true');
    } else {
      alert('❌ Incorrect passcode');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const filename = file.name;

    const { data: existing, error: listError } = await supabase
      .storage
      .from('fitness-videos')
      .list('', { search: filename });

    if (listError) return alert('⚠️ Storage error. Please try again.');

    if (existing?.some(f => f.name === filename)) {
      return alert('⚠️ A video with this filename already exists.');
    }

    const { error } = await supabase.storage
      .from('fitness-videos')
      .upload(filename, file, { upsert: false });

    if (error) return alert('❌ Upload failed.');
    setForm(prev => ({ ...prev, filename }));
    alert('✅ Video uploaded!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, filename, description, tags, category } = form;
    if (!title || !filename || !category) return alert('Title, category, and video file are required.');

    setLoading(true);

    // Determine max order_index
    const { data: all } = await supabase
      .from('fitness_videos')
      .select('order_index')
      .order('order_index', { ascending: true });

    const order_index = 0; // Add to top
    if (all && all.length) {
      for (const row of all) {
        if (typeof row.order_index === 'number') {
          await supabase.from('fitness_videos').update({ order_index: row.order_index + 1 }).eq('order_index', row.order_index);
        }
      }
    }

    const { error } = await supabase.from('fitness_videos').insert([{
      title,
      filename,
      description,
      tags: tags.split(',').map(t => t.trim()),
      category,
      order_index
    }]);

    setLoading(false);

    if (error) {
      alert('❌ Failed to save metadata.');
    } else {
      alert('✅ Video metadata saved!');
      setForm({ title: '', filename: '', description: '', tags: '', category: '' });
    }
  };

  if (!authenticated) {
    return (
      <div className="p-10 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Enter Upload Passcode</h2>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter passcode"
          className="border px-4 py-2 rounded w-full mb-4"
        />
        <button
          onClick={handleAuth}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload New Fitness Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="file"
          accept="video/mp4"
          className="border p-2 w-full rounded"
          onChange={handleFileUpload}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full rounded"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="border p-2 w-full rounded"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <select
          className="border p-2 w-full rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FitnessUpload;

