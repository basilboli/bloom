'use client';

import {Rocket} from 'lucide-react';
import {LearningPath} from "@/app/learningPath";

const COLORS = {
  background: '#FA812F',
  light: '#FEF3E2',
  gold: '#FAB12F',
  red: '#FA4032'
};

// Main Page Component
export default function Home() {
  return (
    <div style={{ background: COLORS.background }} className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="text-5xl font-bold text-white mb-8">
            bloom
          </div>

          {/* Interactive Spanish Text */}
          <div className="text-4xl md:text-6xl text-white leading-tight mb-12">
            El idioma es el jardín de tu mente
          </div>

          {/* CTA Button */}
          <button
            className="bg-white text-orange-500 rounded-full px-8 py-6 text-xl hover:bg-orange-50 flex items-center justify-center mx-auto"
          >
            <Rocket className="w-6 h-6 mr-2" />
            Start Your Learning
          </button>

        </div>

        {/* Learning Path Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Your Learning Plan
          </h2>
          <LearningPath />
        </div>
      </div>
    </div>
  );
}
