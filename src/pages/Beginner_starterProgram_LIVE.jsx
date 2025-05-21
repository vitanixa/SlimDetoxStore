import React from 'react';
import { Link } from 'react-router-dom';

const Beginner_starterProgram = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">🔰 Beginner 4-Week Starter</h1>
    <p className="text-gray-600 mb-6">Build consistency and mind-body awareness gently, one day at a time.</p>
    <div className="grid gap-4">
      <div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 1: Beginner Full Body</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_full_body_1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 2: Intro to Core</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_core_2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 3: Flex & Flow</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_mobility_3.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 4: Balance & Basics</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_mobility_4.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 5: Stretch Reset</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_stretching_5.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 6: Strength Starter</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_strength_6.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 7: Mobility Basics</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_mobility_7.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 8: Gentle Full Body</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_full_body_8.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
    </div>
    <div className="mt-6">
      <Link to="/fitness/programs" className="text-green-700 underline">← Back to Programs</Link>
    </div>
  </div>
);

export default Beginner_starterProgram;