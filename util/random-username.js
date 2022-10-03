import adjectives from './adjectives.json';
import animals from './animals.json'

export default function generateRandomUsername() {
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomAnimalIndex = Math.floor(Math.random() * animals.length);
    return `${adjectives[randomAdjectiveIndex]} ${animals[randomAnimalIndex]}`;
}