import React, { useEffect, useState } from 'react';
import Word from '../components/word';
import { createInitialState, handleKeyboardInput } from '../components/wordle';

export default function Home() {
    // See the createInitialState() function in components/wordle.js
    // for a more detailed description of the state attributes
    const [wordleState, setWordleState] = useState({
        guessList: [],
        guessResLists: [],
        win: false,
        index: 0,
        answer: '',
    });
    const [message, setMessage] = useState('');

    // TODO: On load, generate a new word

    // Start listening for events when page loads
    useEffect(() => {
        // TODO: Don't listen if the game is over

        // Listen for input
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [wordleState]);

    // Function to handle key presses (event listener)
    const handleKey = (event) => {
        // TODO: Ignore key presses if the user has won

        // TODO: Call the wordle handleKeyboardInput method and update state

        // TODO: Update the message or clear it whenever a key is pressed
    };

    // Check for win or lose conditions
    // The game will end whenever either of these conditions are true
    useEffect(() => {
        // TODO: Update the message if a win condition is met
    }, [wordleState]);

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
                        guessResList={wordleState.guessResLists[i]}
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
