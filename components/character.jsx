import React, { useEffect, useState } from 'react';

export default function Character(props) {
    const [charClass, setCharClass] = useState('');

    useEffect(() => {
        if (props.guessRes === 0) {
            setCharClass('yellow');
        } else if (props.guessRes === 1) {
            setCharClass('green');
        } else if (props.guessRes === -1) {
            setCharClass('grey');
        }
    }, [props.guessRes]);

    return (
        <div
            className={charClass + " character"}
        >
            {props.char}
        </div>
    );
}
