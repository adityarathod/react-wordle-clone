import React from 'react';
import Character from './character';

export default function Word() {
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
            <Character />
            <Character />
            <Character />
            <Character />
            <Character />
        </div>
    );
}
