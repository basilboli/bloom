// src/app/learning-path/word-sprout/page.tsx
"use client"; // This enables client-side rendering for this component

import { useState } from 'react';
import { spanishWords } from '@/data/spanishWords';
import './WordSprout.css'; // Import CSS for styling
import {FaTrashAlt, FaVolumeUp} from 'react-icons/fa'; // Import FontAwesome icon

// Define the type for a Spanish word entry
const WordSprout = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [forgottenWords, setForgottenWords] = useState<Set<string>>(new Set());

    const refreshWords = () => {
        setRefreshKey(prevKey => prevKey + 1); // Update key to trigger re-render
    };

    const handleForgetWord = (spanish: string) => {
        setForgottenWords(new Set(forgottenWords).add(spanish));
    };

    const displayedWords = spanishWords.filter(word => !forgottenWords.has(word.spanish))
        .sort(() => 0.5 - Math.random())
        .slice(0, 24);

    return (
        <div>
            <div className="refresh-container">
                <button
                    onClick={refreshWords}
                    className="refresh-button"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
                >
                    Refresh List
                </button>
            </div>
            <div className="word-sprout-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4" key={refreshKey}>
                {displayedWords.map((word, index) => (
                    <FlippingCard key={index} spanish={word.spanish} english={word.english} onForget={handleForgetWord} />
                ))}
            </div>
        </div>
    );
};

// Define the props type for FlippingCard
interface FlippingCardProps {
    spanish: string;
    english: string;
    onForget: (spanish: string) => void;
}

// Flipping Card Component with typed props
const FlippingCard: React.FC<FlippingCardProps> = ({ spanish, english, onForget }) => {
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

    const handleForget = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent flip when forgetting
        onForget(spanish);
    };

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
                    <button
                        onClick={handleForget}
                        className="forget-button absolute bottom-2 left-2 text-sm bg-red-300 text-white p-2 rounded-full"
                    >
                        <FaTrashAlt/>
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