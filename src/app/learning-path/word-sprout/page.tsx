// src/app/learning-path/word-sprout/page.tsx
"use client"; // This enables client-side rendering for this component

import { useState } from 'react';
import { spanishWords } from '../../../data/spanishWords'; // Adjust the path as needed
import './WordSprout.css'; // Import CSS for styling

// Define the type for a Spanish word entry
const WordSprout = () => {
    return (
        <div className="word-sprout-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {spanishWords.slice(0, 100).map((word, index) => (
                <FlippingCard key={index} spanish={word.spanish} english={word.english} />
            ))}
        </div>
    );
};

// Define the props type for FlippingCard
interface FlippingCardProps {
    spanish: string;
    english: string;
}

// Flipping Card Component with typed props
const FlippingCard: React.FC<FlippingCardProps> = ({ spanish, english }) => {
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