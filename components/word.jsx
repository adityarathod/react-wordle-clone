import React, { useEffect, useState } from 'react';
import Character from './character';

/**
 * The Word component will display a row of 5 Character components.
 * This component will also split words into a character array of length 5
 * from a single string that is passed in.
 * 
 * @param {object} props React props object
 * @param {number[]} props.guessResList List of guess responses for the current object
 * @param {string} props.word The current word to display
 */
export default function Word(props) {
    const [charList, setCharList] = useState(['', '', '', '', '']);

    useEffect(() => {
        // Create an array of 5 characters
        const splitWord = props.word.split('');
        setCharList(splitWord.concat(Array(5 - splitWord.length).fill('')));
    }, [props.word]);

    return (
        <div className="word">
            {charList.map((c, i) => (
                <Character
                    char={c}
                    key={i}
                    guessRes={props.guessResList ? props.guessResList[i] : -2}
                />
            ))}
        </div>
    );
}
