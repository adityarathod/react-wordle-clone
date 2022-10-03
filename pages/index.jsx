import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Word from '../components/word';
import { createInitialState, handleKeyboardInput } from '../components/wordle';
import { addScore } from '../leaderboard';
import generateRandomUsername from '../util/random-username';

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
    const [leaderboardMessage, setLeaderboardMessage] = useState('');

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

    // Function to handle key presses (event listener)
    const handleKey = (event) => {
        // Ignore key presses if the user has won
        if (wordleState.win || wordleState.index === 6) return;

        // Call the wordle method and update state
        const { message: newMessage, wordleState: newState } =
            handleKeyboardInput(event, wordleState);
        setWordleState(newState);

        // Update the message or clear it whenever a key is pressed
        if (newMessage) setMessage(newMessage);
        else setMessage('');
    };

    // Check for win or lose conditions
    // The game will end whenever either of these conditions are true
    useEffect(() => {
        if (wordleState.win) {
            setMessage('You won!!!');
        } else if (wordleState.index === 6) {
            setMessage('You lost :( The word was ' + wordleState.answer);
        } else {
            return;
        }

        // NEW: Wordle scoring
        // If we won or lost, let's persist score too.
        // Here's a simple scoring method:
        //   - We get 5 points for getting the word on the first try.
        //   - Otherwise, we subtract a point for every try, going down to 0 if we couldn't guess the word.
        const score = 6 - wordleState.index;
        const username = generateRandomUsername();
        setLeaderboardMessage('Posting your score to the leaderboard...');
        addScore(username, score).then(() => {
            setLeaderboardMessage(
                `Your score of ${score} was posted to the leaderboard as ${username}!`
            );
        });
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
            <p
                style={{
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    marginTop: '0.2rem',
                }}
            >
                {leaderboardMessage}
            </p>
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    fontFamily: "sans-serif"
                }}
            >
                <Link href="/leaderboard">
                    <a style={{textDecoration: 'underline'}}>Leaderboard</a>
                </Link>
            </div>
        </div>
    );
}
