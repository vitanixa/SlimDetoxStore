
import React from 'react';
import { Link } from 'react-router-dom';

const FitnessPrograms = () => (
  <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-4xl font-bold mb-6">Fitness Programs</h1>
    <p className="text-gray-600 mb-8">Structured journeys to help you stay consistent, motivated, and transform your fitness.</p>
    <div className="grid md:grid-cols-2 gap-6">
      
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Fat Burn Blast</h2>
          <p className="text-sm text-gray-700 mb-2">2-week high-intensity program to ignite fat burn and boost cardio endurance.</p>
          <p className="text-xs text-green-700 mb-2">Tags: HIIT, Core, Dance</p>
          <p className="text-xs text-gray-500 mb-4">Duration: 14 days</p>
          <Link to={`/fitness/programs/fat-burn-blast`} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            View Program →
          </Link>
        </div>
    
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Strength Builder</h2>
          <p className="text-sm text-gray-700 mb-2">21 days of progressive resistance and bodyweight training to build lean muscle.</p>
          <p className="text-xs text-green-700 mb-2">Tags: Strength, Upper Body, Lower Body</p>
          <p className="text-xs text-gray-500 mb-4">Duration: 21 days</p>
          <Link to={`/fitness/programs/strength-builder`} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            View Program →
          </Link>
        </div>
    
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Beginner Starter</h2>
          <p className="text-sm text-gray-700 mb-2">Perfect for beginners — build balance, strength and endurance in just 4 weeks.</p>
          <p className="text-xs text-green-700 mb-2">Tags: Mobility, Foundation, Core</p>
          <p className="text-xs text-gray-500 mb-4">Duration: 28 days</p>
          <Link to={`/fitness/programs/beginner-starter`} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            View Program →
          </Link>
        </div>
    
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Calm & Core Yoga</h2>
          <p className="text-sm text-gray-700 mb-2">Flow-based yoga program to strengthen the core, improve flexibility, and calm the mind.</p>
          <p className="text-xs text-green-700 mb-2">Tags: Yoga, Pilates, Mindfulness</p>
          <p className="text-xs text-gray-500 mb-4">Duration: 21 days</p>
          <Link to={`/fitness/programs/calm-core-yoga`} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            View Program →
          </Link>
        </div>
    
    </div>
  </div>
);

export default FitnessPrograms;
