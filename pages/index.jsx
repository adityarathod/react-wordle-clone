import React, { useEffect, useState } from 'react';
import Word from '../components/word';
import { createInitialState, handleKeyboardInput } from '../components/wordle';

export default function Home() {
    const [wordleState, setWordleState] = useState({ guessList: [] });
    const [message, setMessage] = useState('');

    // On load, generate a new word
    useEffect(() => {
        setWordleState(createInitialState());
    }, []);

    // Start listening for events when page loads
    useEffect(() => {
        // Don't listen if the game is over
        if (wordleState.win || wordleState.index === 6) return;

        // Listen for input
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [wordleState]);

    // Tell people they won or lost
    useEffect(() => {
        if (wordleState.win) {
            setMessage('You won!!!');
        } else if (wordleState.index === 6) {
            setMessage('You lost :( The word was ' + wordleState.answer);
        }
    }, [wordleState]);

    // Function to handle key presses (event listener)
    const handleKey = (event) => {
        // Ignore key presses if the user has won
        if (wordleState.end || wordleState.index === 6) return;

        // Call the wordle method and update state
        const { message: newMessage, wordleState: newState } =
            handleKeyboardInput(event, wordleState);
        setWordleState(newState);
        if (newMessage) setMessage(newMessage);
        else setMessage("");
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
            <div id="board">
                {wordleState.guessList.map((w, i) => (
                    <Word
                        word={w}
                        key={i}
                        guessRes={wordleState.guessResList[i]}
                    />
                ))}
            </div>
            <p
                style={{
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    marginTop: '0.5rem',
                }}
            >
                {message}
            </p>
        </div>
    );
}
