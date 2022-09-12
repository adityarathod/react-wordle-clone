import React, { useEffect, useState } from 'react';
import Character from './character';

export default function Word(props) {
    const [charList, setCharList] = useState(['', '', '', '', '']);

    useEffect(() => {
        // Create an array of 5 characters
        const splitWord = props.word.split('');
        setCharList(splitWord.concat(Array(5 - splitWord.length).fill('')));
    }, [props.word]);

    return (
        <div
            style={{
                width: '100%',
                flexGrow: 1,
                flexBasis: 0,
                display: 'flex',
                flexDirection: 'row',
                gap: '0 1vw',
            }}
        >
            {charList.map((c, i) => (
                <Character char={c} key={i} />
            ))}
        </div>
    );
}
