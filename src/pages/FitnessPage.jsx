import React from 'react';

const workouts = [
  {
    title: '10-Min Fat Burner',
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    description: 'A quick, intense workout to rev your metabolism.'
  },
  {
    title: 'Morning Stretch Routine',
    videoUrl: 'https://www.youtube.com/embed/another-id',
    description: 'Start your day with flexibility and calm.'
  }
];

const FitnessPage = () => (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Vitanixa Fitness</h1>
    <p className="text-gray-700 mb-8">Daily workouts to energize, burn fat, and build wellness.</p>

    <div className="grid gap-8 md:grid-cols-2">
      {workouts.map((workout, idx) => (
        <div key={idx} className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">{workout.title}</h2>
          <iframe
            src={workout.videoUrl}
            title={workout.title}
            className="w-full h-64 rounded"
            allowFullScreen
          />
          <p className="text-sm mt-2 text-gray-600">{workout.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FitnessPage;

