// src/app/learning-path/word-sprout/page.tsx
"use client"; // This enables client-side rendering for this component

import { useState } from 'react';
import { spanishWords } from '@/data/spanishWords';
import './WordSprout.css'; // Import CSS for styling
import { FaVolumeUp } from 'react-icons/fa'; // Import FontAwesome icon

// Define the type for a Spanish word entry
const WordSprout = () => {
    return (
        <div className="word-sprout-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {spanishWords.sort(() => 0.5 - Math.random()).slice(0, 24).map((word, index) => (
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

    const handlePronounce = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Set the rate of speech
        utterance.pitch = 1; // Set the pitch of the voice
        utterance.volume = 1; // Set the volume of the speech
        utterance.lang = 'es-ES'; // Set language to Spanish
        speechSynthesis.speak(utterance);
    };
    const handleFlip = () => setFlipped(!flipped);

    return (
        <div
            className={`flipping-card ${flipped ? 'flipped' : ''}`}
            onClick={handleFlip}
        >
            <div className="flipping-card-inner">
                <div className="flipping-card-front">
                    <p className="text-xl font-bold">{spanish}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePronounce(spanish);
                        }}
                        className="absolute bottom-2 right-2 text-2xl"
                    >
                        <FaVolumeUp/>
                    </button>
                </div>
                <div className="flipping-card-back">
                    <p className="text-xl font-bold">{english}</p>
                </div>
            </div>
        </div>
    );
};

export default WordSprout;