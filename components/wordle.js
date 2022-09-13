import data from '../components/data.json';

/**
 * Initializes a wordle game with the default states. Will also decide a random word.
 *
 * @returns The initial state of the wordle game
 */
export function createInitialState() {
    // Select a random word from the list of answers
    // and stores it in the answer state variable
    const randIndex = Math.floor(Math.random() * data.answers.length);
    const randWord = data.answers[randIndex];
    console.log('Random word at index ', randIndex, ': ', randWord);

    return {
        // The list of guesses as strings of max 5 characters
        guessList: Array(6).fill(''),

        // The 2D list of guess responses
        // where each row corresponds to a row on the board.
        // Each cell will contain either -1 (nothing), 0 (wrong position), 1 (correct)
        guessResList: Array(6).fill(null),

        // True if the player has won
        win: false,

        // Tracks the word index (0-5)
        // If this is 6, the game ends with a losing state if win is not true
        index: 0,

        // Creates an answer object
        answer: randWord,
    };
}

/**
 * Handles keyboard input for a letter entered, Backspace, or Enter keys
 *
 * @param {KeyboardEvent} event The current event
 * @param {*} wordleState The wordle state object
 * @returns The message (if any) plus the updated newWordleState {message, wordleState}
 */
export function handleKeyboardInput(event, wordleState) {
    // Create a new wordle state
    // as the state should be immutable
    let newWordleState = { ...wordleState };

    // Get the current guess
    const guess = wordleState.guessList[wordleState.index];

    // If a letter is typed, perform an action
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        // If the key typed is a letter,
        // check to make sure current guess is less than 5 characters long
        // and update the guess string if so
        if (guess.length < 5) {
            newWordleState.guessList[wordleState.index] =
                guess + event.key.toUpperCase();
        }
    } else if (event.key === 'Backspace') {
        // Make sure current word is not empty
        // before removing a character from the guess string
        if (guess.length > 0) {
            newWordleState.guessList[wordleState.index] = 
                guess.substring(0, guess.length - 1);
        }
    } else if (event.key === 'Enter') {
        // If the user presses enter, check the word against the answer
        return checkGuess(wordleState, newWordleState);
    }

    return { wordleState: newWordleState };
}

/**
 * Checks the guess against the answer and updates the state
 *
 * @param {*} wordleState Old state (immutable)
 * @param {*} newWordleState New state
 * @returns The message (if any) plus the updated newWordleState {message, wordleState}
 */
function checkGuess(wordleState, newWordleState) {
    // Compare the guess to the answer
    // when the user hits Enter
    const guess = 
        String(wordleState.guessList[wordleState.index]).toLowerCase();

    // Check to make sure word is 5 letters long
    if (guess.length !== 5) {
        return { message: 'Word must be exactly 5 characters!', wordleState };
    }

    // Make sure the guess is in the dictionary
    if (
        data.dictionary.indexOf(guess) === -1 &&
        data.answers.indexOf(guess) === -1
    ) {
        return { message: guess.toUpperCase() + ' is not a valid word!', wordleState };
    }

    // Check for correct letters
    // We will count correct letters to see if we won
    // And the guessRes will store the results for the current guess
    let guessRes = [-1, -1, -1, -1, -1];
    let correct = 0;
    let answerCheck = wordleState.answer.split('');
    const guessCheck = guess.split('');

    // Loop through the guess and find letters that are correct
    for (let i = 0; i < 5; i++) {
        if (guessCheck[i] === answerCheck[i]) {
            guessRes[i] = 1;
            answerCheck[i] = '';
            correct++;
        }
    }

    // Find letters that are in the word but not in the correct place
    for (let i = 0; i < 5; i++) {
        if (guessRes[i] != 1 && answerCheck.indexOf(guess[i]) != -1) {
            guessRes[i] = 0;
            answerCheck[i] = '';
        }
    }

    // Update state variables
    newWordleState.guessResList[wordleState.index] = guessRes;
    newWordleState.index++;

    // End the game if all correct
    if (correct === 5) {
        newWordleState.win = true;
    }

    return { wordleState: newWordleState };
}
