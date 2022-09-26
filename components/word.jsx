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
    return (
        <div className="word">
            <Character />
            <Character />
            <Character />
            <Character />
            <Character />
        </div>
    );
}
