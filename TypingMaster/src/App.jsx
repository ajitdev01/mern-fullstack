import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef();

  const paraGraph =
    "Brainzima — As a proud venture under the esteemed umbrella of Brainzima Innovation Pvt Ltd, we are your gateway to a dynamic fusion of IT excellence and cutting-edge computer education. Brainzima Innovation Institute is where innovation thrives and knowledge transcends boundaries. Nestled within the powerhouse of Brainzima Innovation Pvt Ltd, we specialize in two core domains: Web Development and Computer Education.";

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <div className="container" onClick={handleFocus}>
        <div className="card">
          <h1 className="title">Typing Master</h1>

          <div className="display-text">
            {paraGraph.split("").map((char, index) => {
              let ColorClass = "normal";

              if (userInput.length === index) {
                ColorClass += " active";
              } else if (index < userInput.length) {
                ColorClass += userInput[index] === char ? " correct" : " incorrect";
              }

              return (
                <span className={ColorClass} key={index}>
                  {char}
                </span>
              );
            })}
          </div>

          <div className='UserInput'>
            All type Text You
            <span style={{color:"blue", margin:"5px", fontSize:"20px"}}>
              {userInput.length}
            </span>
          </div>

          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            ref={inputRef}
            autoFocus
            className="hidden-input"
            type="text"
          />
        </div>
      </div>
    </>
  );
}

export default App;
