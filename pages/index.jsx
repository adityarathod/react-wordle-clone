import React, { useEffect, useState } from 'react';
import Word from '../components/word';

import data from '../components/data.json';

export default function Home() {
    const [answer, setAnswer] = useState(null);
    const [currGuess, setCurrGuess] = useState('');
    const [currIndex, setCurrIndex] = useState(0);
    const [guessList, setGuessList] = useState(Array(6).fill(''));
    const [guessResList, setGuessResList] = useState(Array(5).fill(null));
    const [end, setEnd] = useState(false);

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
        // Don't listen if the game is over
        if (end) return;

        // Listen for input
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
        if (end) return;

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
            if (
                data.dictionary.indexOf(guess) === -1 &&
                data.answers.indexOf(guess) === -1
            ) {
                alert(currGuess + ' is not a valid word!');
                return;
            }

            // Check for correct letters
            // -1 = grey, 0 = yellow, 1 = green
            let guessRes = [-1, -1, -1, -1, -1];
            let correct = 0;
            let answerCheck = answer.split('');

            // Loop through the word and find letters that are correct
            for (let i = 0; i < 5; i++) {
                if (guess.at(i) === answerCheck[i]) {
                    guessRes[i] = 1;
                    answerCheck[i] = '';
                    correct++;
                }
            }

            // Find letters that are in the word but not in the correct place
            for (let i = 0; i < 5; i++) {
                if (
                    guessRes[i] != 1 &&
                    answerCheck.indexOf(guess.at(i)) != -1
                ) {
                    guessRes[i] = 0;
                    answerCheck[i] = '';
                }
            }

            // Show the correct words by updating the guessResList
            const guessResListCopy = guessResList.slice(0);
            guessResListCopy[currIndex] = guessRes;
            setGuessResList(guessResListCopy);

            // End the game if all correct
            if (correct === 5) {
                alert('YOU WIN!!!');
                setEnd(true);
            }

            // End the game if no more guesses left
            if (currIndex === 5) {
                alert('No more moves :( The word is ' + answer);
                setEnd(true);
                return;
            }

            // Update the counting state variables
            setCurrIndex(currIndex + 1);
            setCurrGuess('');
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
