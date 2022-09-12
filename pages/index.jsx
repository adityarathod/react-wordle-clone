import React, { useEffect, useState } from 'react';
import Word from '../components/word';

import data from '../components/data.json';

export default function Home() {
    const [answer, setAnswer] = useState(null);
    const [currGuess, setCurrGuess] = useState('');
    const [currIndex, setCurrIndex] = useState(0);
    const [guessList, setGuessList] = useState(['', '', '', '', '', '']);
    const [guessResList, setGuessResList] = useState([null, null, null, null, null, null]);

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
    }, [currGuess]);

    // Update the guess list when the current word is edited
    useEffect(() => {
        let guessListCopy = guessList.slice(0);
        guessListCopy[currIndex] = currGuess;
        setGuessList(guessListCopy);
    }, [currGuess]);

    // Handle key presses
    const handleKey = (event) => {
        if (event.repeat) return;

        // If a letter is typed
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            // Check to make sure current word is less than 5 characters long
            if (currGuess.length < 5) {
                setCurrGuess(currGuess + event.key.toUpperCase());
            }
        } else if (event.key === 'Backspace') {
            // Make sure current word is not empty
            if (currGuess.length > 0) {
                setCurrGuess(currGuess.substring(0, currGuess.length - 1));
            }
        } else if (event.key === 'Enter') {
            // Compare the guess to the answer
            const guess = String(currGuess).toLowerCase();

            // Check to make sure word is 5 letters long
            if (currGuess.length !== 5) {
                alert('Word must be exactly 5 characters!');
                return;
            }

            // Make sure the guess is in the dictionary
            if (data.dictionary.indexOf(guess) === -1 && data.answers.indexOf(guess) === -1) {
                alert(currGuess + ' is not a valid word!');
                return;
            }

            // Check for correct letters
            // -1 = grey, 0 = yellow, 1 = green
            let guessRes = [-1, -1, -1, -1, -1];
            let answerCheck = answer.split("");
            for (let i = 0; i < 5; i++) {
                if (guess.at(i) === answerCheck[i]) {
                    guessRes[i] = 1;
                    answerCheck[i] = "";
                }
            }
            for (let i = 0; i < 5; i++) {
                if (guessRes[i] != 1 && answerCheck.indexOf(guess.at(i)) != -1) {
                    guessRes[i] = 0;
                    answerCheck[i] = "";
                }
            }

            // Update the state variables
            const guessResListCopy = guessResList.slice(0);
            guessResListCopy[currIndex] = guessRes;
            setGuessResList(guessResListCopy);
            setCurrIndex(currIndex + 1);
            setCurrGuess("");
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
                    gap: '0.5vw 0',
                }}
            >
                {guessList.map((w, i) => (
                    <Word word={w} key={i} guessRes={guessResList[i]} />
                ))}
            </div>
        </div>
    );
}
