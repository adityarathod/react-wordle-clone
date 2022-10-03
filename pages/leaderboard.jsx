import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllScores } from '../leaderboard';

function Score({ scoreObj, index }) {
    return (
        <div
            style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                width: '100%',
            }}
        >
            {index + 1}. {scoreObj.username} - {scoreObj.score}
        </div>
    );
}

export default function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        getAllScores().then((allScores) => setScores(allScores));
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Leaderboard</h1>

            <section
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    padding: '0 0.75rem',
                }}
            >
                {scores.length === 0 && <div>Loading...</div>}
                {scores.map((score, idx) => {
                    return <Score scoreObj={score} index={idx} key={idx} />;
                })}
            </section>
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    fontFamily: 'sans-serif',
                }}
            >
                <Link href="/">
                    <a style={{ textDecoration: 'underline' }}>
                        ⬅️ Back to Wordle
                    </a>
                </Link>
            </div>
        </div>
    );
}
