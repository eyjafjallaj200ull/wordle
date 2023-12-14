import React, { useEffect, useState } from 'react';
import {ReactComponent as Backspace} from "../assets/backspace.svg";

//need an onClick for the keypad keys
//it takes letter.key as argument
//use handleKeyup

export default function Keypad({usedKeys, handleKeyup}) {
    const [letters, setLetters] = useState(null)

    useEffect(() => {
        fetch("https://eyjafjallaj200ull.github.io/wordle/db.json")
        .then(res => res.json())
        .then(json => {
            setLetters(json.letters)
        })
    }, [])

    return (
        <div className='keypad'>
            {letters && letters.map((letter) => {
                if (letter.key === "Enter") {
                    return <div onClick={() => handleKeyup(letter)} key={letter.key} className='enter'>{letter.key}</div>
                }
                if (letter.key === "Backspace") {
                    return <div onClick={() => handleKeyup(letter)} key={letter.key} className='backspace'><Backspace title='Backspace' width="50%" height="100%" fill='currentColor' /></div>
                }
                {
                    const color = usedKeys[letter.key];
                    return (
                        <div onClick={() => handleKeyup(letter)} key={letter.key} className={color}>{letter.key}</div>
                    )
                }
            })}
        </div>
    )
}
