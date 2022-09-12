import React, { useEffect, useState } from 'react';

export default function Character(props) {
    const [charClass, setCharClass] = useState('');

    useEffect(() => {
        if (props.guessRes === 0) {
            setCharClass('yellow');
        } else if (props.guessRes === 1) {
            setCharClass('green');
        }
    }, [props.guessRes]);

    return (
        <div
            style={{
                height: '100%',
                flexGrow: 1,
                flexBasis: 0,
                border: '2px solid #5b5b5b',
                fontSize: '3vw',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: '0.5s',
            }}
            className={charClass}
        >
            {props.char}
        </div>
    );
}
