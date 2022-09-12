import React from 'react';

export default function Character(props) {
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
            }}
        >
            {props.char}
        </div>
    );
}
