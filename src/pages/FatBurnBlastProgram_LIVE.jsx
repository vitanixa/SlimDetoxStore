import React from 'react';
import { Link } from 'react-router-dom';

const FatBurnBlastProgram = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">🔥 2-Week Fat Burn Blast</h1>
    <p className="text-gray-600 mb-6">
      A 14-day program focused on cardio, HIIT, and core — designed to ignite your metabolism and keep you sweating.
    </p>
    <div className="grid gap-4">
      <div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 1: Fat Burn Express</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_cardio_1.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 2: HIIT Burnout</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_hiit_2.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 3: Dance Cardio Flow</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_dance_3.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 4: Core Shred</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_core_4.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 5: Mobility Stretch</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_mobility_5.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 6: Upper Body Blast</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_upper_body_6.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 7: Full Body Fire</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_full_body_7.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 8: Stretch & Recover</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week1_stretching_6.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 9: Cardio Remix</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_cardio_8.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div><div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold">Day 10: Final Burn Challenge</h2>
  <video controls className="w-full rounded mt-2">
    <source
      src="https://sjzdpvwzolilzdlxagsq.supabase.co/storage/v1/object/public/fitness-videos/week2_final_burn_9.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div>
    </div>
    <div className="mt-6">
      <Link to="/fitness/programs" className="text-green-700 underline">
        ← Back to Programs
      </Link>
    </div>
  </div>
);

export default FatBurnBlastProgram;