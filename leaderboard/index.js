import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
} from 'firebase/firestore';

/**
 * Adds a score to the `scores` collection in Firestore.
 * @param {string} username The name of the user.
 * @param {number} score The score assigned to the user.
 */
export async function addScore(username, score) {
    try {
        const ref = await addDoc(collection(db, 'scores'), {
            username: username,
            score: score,
        });
        console.log('Score written with ID ' + ref.id);
    } catch (err) {
        console.error('Error persisting score.', err);
    }
}

/**
 * Get all scores from the `scores` collection in Firestore.
 * @return A list of usernames, scores, and document IDs.
 */
export async function getAllScores() {
    try {
        const q = query(collection(db, 'scores'), orderBy('score', 'desc'));
        const docs = await getDocs(q);
        return docs.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
    } catch (err) {
        console.error('Error getting scores.', err);
    }
}
