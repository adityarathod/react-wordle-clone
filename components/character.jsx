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
    const [color, setColor] = useState('');

    useEffect(() => {
        if (props.guessRes === 0) {
            setColor('yellow');
        } else if (props.guessRes === 1) {
            setColor('green');
        } else if (props.guessRes === -1) {
            setColor('grey');
        }
    }, [props.guessRes]);

    return <div className={color + ' character'}>{props.char}</div>;
}
