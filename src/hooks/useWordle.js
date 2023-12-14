import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]) //each guess is an array
    const [history, setHistory] = useState([]) //each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    //format a guess into an array of letter objects
    //e.g. [{key: "a", color: "yellow"}]
    const formatGuess = () => {
        console.log(solution);
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: "grey"}
        });
        let guessIndices = []
        formattedGuess.forEach((letter, i) => {
            
            if (solutionArray.includes(letter.key) && letter.color === "grey") {
                let solutionIndices = []
                let idxSolution = solutionArray.indexOf(letter.key);
                while (idxSolution !== -1) {
                    solutionIndices.push(idxSolution);
                    idxSolution = solutionArray.indexOf(letter.key, idxSolution + 1);
                }
                formattedGuess.forEach((item, index) => {
                    if (item.key === letter.key) {
                        guessIndices.push(index)
                    }
                })
                solutionIndices.forEach((solutionIndex, index) => {
                    if (formattedGuess[solutionIndex].key === solutionArray[solutionIndex]) {
                        formattedGuess[solutionIndex].color = "green"
                    } else {
                        formattedGuess[guessIndices[index]].color = "yellow"
                    }
                })
            }
        })

        return formattedGuess;
    }

    //add a new guess to the guesses state
    //update the isCorrect state if the guess is correct
    //add 1 to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn +1
        })
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys};

            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key];

                if (letter.color === "green") {
                    newKeys[letter.key] = "green"
                    return
                }
                if (letter.color === "yellow" && currentColor !== "green") {
                    newKeys[letter.key] = "yellow" 
                    return
                }
                if (letter.color === "grey" && currentColor !== "green" && currentColor !== "yellow") {
                    newKeys[letter.key] = "grey"
                    return
                }

            })

            return newKeys;
        })
        setCurrentGuess("")
    }

    //handle keyup event & track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if (key === "Enter") {
            //only add guess if turn is less than or equal to 5
            if (turn > 5) {
                console.log("you used all your guesses");
                return
            }
            //do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log("you already tried that word");
                return
            }
            //check word is 5 chars long
            if (currentGuess.length !== 5) {
                console.log("word must be 5 chars long");
                return
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }
        if (key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle