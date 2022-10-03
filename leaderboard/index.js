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
    // TODO: finish this function!
    return;
}

/**
 * Get all scores from the `scores` collection in Firestore.
 * @return A list of usernames, scores, and document IDs.
 */
export async function getAllScores() {
    // TODO: finish this function!
    return [];
}
