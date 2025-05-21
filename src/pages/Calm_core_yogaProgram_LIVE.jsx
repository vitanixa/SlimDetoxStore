import React from 'react';
import { Link } from 'react-router-dom';

const Calm_core_yogaProgram = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">🧘 Calm & Core Yoga Journey</h1>
    <p className="text-gray-600 mb-6">Breathe, stretch, and strengthen your center with daily yoga-inspired flows.</p>
    <div className="grid gap-4">
      <div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 1: Gentle Core & Breath</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_yoga_1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 2: Slow Flow Mobility</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_mobility_2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 3: Balance + Breath</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_yoga_3.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 4: Pilates Control</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_pilates_4.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 5: Stretch + Calm</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_stretching_5.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 6: Core Burn Yoga</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_core_6.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 7: Restorative Stretch</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_yoga_7.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 8: Flow Reset</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week4_mobility_8.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
    </div>
    <div className="mt-6">
      <Link to="/fitness/programs" className="text-green-700 underline">← Back to Programs</Link>
    </div>
  </div>
);

export default Calm_core_yogaProgram;