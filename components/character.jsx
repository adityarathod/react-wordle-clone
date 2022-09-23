import React, { useEffect, useState } from 'react';

/**
 * The character component will display a single character.
 * When the guessRes is updated, the component should also change color
 * based on the response (-1 = grey, 1 = green, 0 = yellow)
 *
 * @param {object} props The passed in React properties
 * @param {String} props.char A single character (stored as a string) to be displayed
 * @param {Number} props.guessRes The guess response (-1 for no match, 1 for correct match, 0 for wrong position)
 */
export default function Character(props) {
    return (
        <div
            className="character"
        >
        </div>
    );
}
