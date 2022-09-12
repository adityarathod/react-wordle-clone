import React, { useEffect, useState } from 'react';
import Word from '../components/word';

import data from '../components/data.json';

export default function Home() {
    const [answer, setAnswer] = useState(null);
    const [currWord, setCurrWord] = useState('');
    const [currIndex, setCurrIndex] = useState(0);
    const [guessList, setGuessList] = useState(['', '', '', '', '', '']);

    // On page load, start the game by generating a word
    useEffect(() => {
        // Select a random word from the list of answers
        // and stores it in the answer state variable
        const randIndex = Math.floor(Math.random() * data.answers.length);
        const randWord = data.answers[randIndex];
        console.log('Random word at index ', randIndex, ': ', randWord);
        setAnswer(randWord);
    }, []);

    // Start listening for events when page loads
    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [currWord]);

    // Update the guess list when the current word is edited
    useEffect(() => {
        let guessListCopy = guessList.slice(0);
        guessListCopy[currIndex] = currWord;
        setGuessList(guessListCopy);
    }, [currWord]);

    // Handle key presses
    const handleKey = (event) => {
        if (event.repeat) return;

        // If a letter is typed
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            // Check to make sure current word is less than 5 characters long
            if (currWord.length < 5) {
                setCurrWord(currWord + event.key.toUpperCase());
            }
        } else if (event.key === 'Backspace') {
            // Make sure current word is not empty
            if (currWord.length > 0) {
                setCurrWord(currWord.substring(0, currWord.length - 1));
            }
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Wordle!</h1>
            <div
                style={{
                    height: '30vw',
                    width: '25vw',
                    padding: '1vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vw 0',
                }}
            >
                {guessList.map((w, i) => (
                    <Word word={w} key={i} />
                ))}
            </div>
        </div>
    );
}
