import React from "react";
import { useEffect } from "react";

// Import custom CSS styles
import "./css/App.css";

// Import custom components
import BackgroundMusic from "./components/BackgroundMusic";
import GameContainer from "./components/GameContainer";

function App() {
  useEffect(() => {
    // Title Name to Appear on Browser
    document.title = "Manish Ekreb Game";
  }, []);
  return (
    <div className="App">
      <BackgroundMusic />
      <GameContainer />
    </div>
  );
}

export default App;
