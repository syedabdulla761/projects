import { useState } from "react"
import UserInput from "./components/UserInput"
import Results from "./components/Results";
function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  })

  const inputIsValid = userInput.duration > 0;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prev) => ({
      ...prev,
      [inputIdentifier]: +newValue
    }));
  }

  return (<main>
    <UserInput onChange={handleChange} userInput={userInput}></UserInput>
    { inputIsValid ? <Results input={userInput}></Results> : <p className="center">Please enter a duration greater than zero.</p>}
  </main>
  )
}

export default App
