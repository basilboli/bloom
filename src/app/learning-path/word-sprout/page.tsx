// src/components/WordSprout.js
"use client"; // This enables client-side rendering for this component
import { useState } from 'react';
import { spanishWords } from '@/data/spanishWords'; // Corrected path for data
import './WordSprout.css'; // We'll add some custom CSS for the flip animation

const WordSprout = () => {
    return (
        <div className="word-sprout-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {spanishWords.slice(0, 100).map((word, index) => (
                <FlippingCard key={index} spanish={word.spanish} english={word.english} />
            ))}
        </div>
    );
};

// Flipping Card Component
const FlippingCard = ({ spanish, english }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => setFlipped(!flipped);

    return (
        <div
            className={`flipping-card ${flipped ? 'flipped' : ''}`}
            onClick={handleFlip}
        >
            <div className="flipping-card-inner">
                <div className="flipping-card-front">
                    <p className="text-xl font-bold">{spanish}</p>
                </div>
                <div className="flipping-card-back">
                    <p className="text-xl font-bold">{english}</p>
                </div>
            </div>
        </div>
    );
};

export default WordSprout;