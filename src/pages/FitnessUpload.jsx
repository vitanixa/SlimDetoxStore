import React, { useState } from 'react';
import { supabase } from '../supabase';

const FitnessUpload = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [form, setForm] = useState({
    title: '',
    filename: '',
    description: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    if (passcode === 'vitanixa123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect passcode');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from('fitness-videos')
      .upload(`workouts/${file.name}`, file, { upsert: true });

    if (!error) {
      alert('Video uploaded!');
      setForm({ ...form, filename: file.name });
    } else {
      alert('Upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.filename) return alert('Title and filename required');
    setLoading(true);

    const { error } = await supabase.from('fitness_videos').insert([{
      title: form.title,
      filename: form.filename,
      description: form.description,
      tags: form.tags.split(',').map(tag => tag.trim()),
    }]);

    if (error) {
      alert('Failed to save metadata');
    } else {
      alert('Video metadata saved!');
      setForm({ title: '', filename: '', description: '', tags: '' });
    }
    setLoading(false);
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
