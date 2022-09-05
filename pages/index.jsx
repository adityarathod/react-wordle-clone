import React, { useEffect, useState } from 'react';
import Word from '../components/word';

import data from '../components/data.json';

export default function Home() {
  const [answer, setAnswer] = useState(null);

  // On page load, start the game by generating a word
  useEffect(() => {
    // Select a random word from the list of answers
    // and stores it in the answer state variable
    const randIndex = Math.floor(Math.random() * data.answers.length);
    const randWord = data.answers[randIndex];
    console.log("Random word at index ", randIndex, ": ", randWord);
    setAnswer(randWord);
  }, []);

  // Start listening for events when page loads
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Handle key presses
  const handleKey = (event) => {
    // If a letter is typed
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      console.log(event.key.toLowerCase());
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
      </div>
    </div>
  );
}
