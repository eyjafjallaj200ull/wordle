import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({solution, setNewGame, newGame}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener("keyup", handleKeyup)
        }

        if (turn > 5 && !isCorrect) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener("keyup", handleKeyup)
        }

        return () => {
            window.removeEventListener("keyup", handleKeyup);
        }
    }, [handleKeyup, isCorrect, turn])

    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
            {showModal && <Modal newGame={newGame} setNewGame={setNewGame} isCorrect={isCorrect} turn={turn} solution={solution} />}
        </div>
    );
}
