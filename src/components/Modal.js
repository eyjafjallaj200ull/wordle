import React from 'react'

export default function Modal({ isCorrect, turn, solution, setNewGame, newGame }) {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You won!</h1>
                <p className='solution'>{solution}</p>
                <p>You found the solution in {turn} guesses</p>
                <button onClick={() => setNewGame(!newGame)}>Start a new game</button> 
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>Nevermind!</h1>
                <p className='solution'>{solution}</p>
                <p>Better luck next time!</p>
                <button onClick={() => setNewGame(!newGame)}>Start a new game</button> 
            </div>
        )}
    </div>
  )
}
