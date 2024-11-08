'use client';

import { useState, useEffect, useRef } from 'react';
import { Flower, Rocket, Book, Music, Film, Users, Star, Lock, CheckCircle } from 'lucide-react';

const COLORS = {
  background: '#FA812F',
  light: '#FEF3E2',
  gold: '#FAB12F',
  red: '#FA4032'
};

// CircularReveal Component
const CircularReveal = ({ spanish, english }: { spanish: string; english: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <span
      ref={elementRef}
      className="relative inline-block cursor-pointer select-none"
      onMouseDown={(e) => {
        setIsDragging(true);
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
      }}
    >
      <span className="relative inline-block">{spanish}</span>
      {isDragging && (
        <div className="fixed top-0 left-0 w-full h-full overflow-visible pointer-events-none">
          <div
            className="absolute rounded-full shadow-lg transition-transform duration-75"
            style={{
              width: '120px',
              height: '120px',
              transform: `translate(${position.x - 60}px, ${position.y - 60}px)`,
              background: 'rgba(200, 200, 200, 0.95)',
              border: '2px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              zIndex: 20
            }}
          />
          <div
            className="absolute flex items-center justify-center text-center"
            style={{
              width: '100px',
              height: '100px',
              transform: `translate(${position.x - 50}px, ${position.y - 50}px)`,
              color: COLORS.background,
              fontSize: '0.9em',
              fontWeight: '500',
              zIndex: 30
            }}
          >
            {english}
          </div>
        </div>
      )}
    </span>
  );
};

// LearningPath Component
const LearningPath = () => {
  const levels = [
    {
      id: 1,
      name: "Word Sprout",
      icon: <Flower className="w-8 h-8" />,
      description: "Plant the seeds of basic vocabulary",
      unlocked: true,
      completed: true
    },
    {
      id: 2,
      name: "Phrase Garden",
      icon: <Book className="w-8 h-8" />,
      description: "Grow your first sentences",
      unlocked: true,
      completed: false
    },
    {
      id: 3,
      name: "Melody Meadow",
      icon: <Music className="w-8 h-8" />,
      description: "Learn through Spanish songs",
      unlocked: false,
      completed: false
    },
    {
      id: 4,
      name: "Culture Canyon",
      icon: <Film className="w-8 h-8" />,
      description: "Explore through movies and shows",
      unlocked: false,
      completed: false
    },
    {
      id: 5,
      name: "Social Summit",
      icon: <Users className="w-8 h-8" />,
      description: "Master conversations",
      unlocked: false,
      completed: false
    },
    {
      id: 6,
      name: "Fluency Peak",
      icon: <Star className="w-8 h-8" />,
      description: "Achieve native-like fluency",
      unlocked: false,
      completed: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
      {levels.map((level) => (
        <div 
          key={level.id}
          className={`p-6 rounded-lg shadow ${level.unlocked ? 'bg-white' : 'bg-gray-100'}`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${
              level.unlocked ? 'bg-orange-100' : 'bg-gray-200'
            }`}>
              {level.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{level.name}</h3>
                {level.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                {!level.unlocked && <Lock className="w-5 h-5 text-gray-400" />}
              </div>
              <p className="text-sm text-gray-600">{level.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
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
            <CircularReveal 
              spanish="El idioma es el jardín" 
              english="Language is the garden"
            />{" "}
            <CircularReveal 
              spanish="de tu mente" 
              english="of your mind"
            />
          </div>

          {/* CTA Button */}
          <button
            className="bg-white text-orange-500 rounded-full px-8 py-6 text-xl hover:bg-orange-50 flex items-center justify-center mx-auto"
          >
            <Rocket className="w-6 h-6 mr-2" />
            Start Your Journey
          </button>

          <p className="text-white/80">
            Drag over Spanish words to reveal their meaning
          </p>
        </div>

        {/* Learning Path Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Your Blooming Journey
          </h2>
          <LearningPath />
        </div>
      </div>
    </div>
  );
}