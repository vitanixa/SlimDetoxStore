import React from 'react';
import { Link } from 'react-router-dom';

const Strength_builderProgram = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">💪 21-Day Strength Builder</h1>
    <p className="text-gray-600 mb-6">Build power with weekly full body, upper/lower, and core workouts.</p>
    <div className="grid gap-4">
      <div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 1: Push Power</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week3_upper_body_1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 2: Leg Day Burn</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week3_lower_body_2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 3: Core Control</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week3_core_3.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 4: Full Body Force</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week3_strength_4.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 5: Dynamic Strength</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week3_strength_5.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 6: Upper Blast</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week3_upper_body_6.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 7: Lower Body Torch</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week3_lower_body_7.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 8: Stretch Recovery</h2>
  <video controls className="w-full rounded mt-2">
    <source src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_stretching_6.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
    </div>
    <div className="mt-6">
      <Link to="/fitness/programs" className="text-green-700 underline">← Back to Programs</Link>
    </div>
  </div>
);

export default Strength_builderProgram;