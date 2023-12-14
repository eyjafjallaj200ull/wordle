import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import {ReactComponent as DarkToggle} from "./assets/moon.svg";
import {ReactComponent as LightToggle} from "./assets/sun.svg"
import { ErrorBoundary } from "react-error-boundary";

//error message for server error
//error message for app error

function App() {
  const [solution, setSolution] = useState(null);
  const [newGame, setNewGame] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    const root = document.querySelector(":root")
    if(theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  })

  useEffect(() => {
    fetch("https://eyjafjallaj200ull.github.io/wordle/db.json")
    .then(res => res.json())
    .then(json => {
      //random int between 0 and 49
      const randomSolution = json[Math.floor(Math.random() * json.length)];
      setSolution(randomSolution.word);
      setNewGame(true)
    })
    .catch(e => {
      console.error(e);
      setServerError(true);
    })
  }, [setSolution, newGame])

  return (
    <div className="App"> 
      <header>
        <h1>Wordle</h1>
        <div className="theme-toggle" onClick={() => setTheme((prevState) => prevState === "dark" ? "light" : "dark")} > 
        {theme === "dark" ? 
          <LightToggle /> : <DarkToggle />}
        </div>
      </header>
      {serverError ? <p>An error occurred on the server</p> : ""  }
      {newGame ? solution &&
       <ErrorBoundary fallback={<p>An error occurred, please refresh the page for a new game.</p>}>
        <Wordle newGame={newGame} setNewGame={setNewGame} solution={solution} />
      </ErrorBoundary>
         : null}
    </div>
  );
}

export default App;
