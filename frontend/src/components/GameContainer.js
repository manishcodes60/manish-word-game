import React from "react";
import { useState, useEffect } from "react";

// Import the icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Import elements from Bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import custom CSS
import "../css/Loader.css";
import "../css/GameContainer.css";

// Import custom Components
import WordHint from "./WordHint";
import GameStatistics from "./GameStatistics";

function GameContainer() {
  // Setting states for game
  const [scrambledWord, setSrambledWord] = useState(null);
  const [originalWord, setOriginalWord] = useState(null);
  const [wordHint, setWordHint] = useState(null);
  const [wordCategory, setWordCategory] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [currentUserScore, setCurrentUserScore] = useState("");
  const [isWrongGuess, setIsWrongGuess] = useState(false);
  // For Alert Messages
  const [showCorrectAlert, setCorrectShowAlert] = useState(false);
  const [showWrongAlert, setWrongShowAlert] = useState(false);
  // For Loading Animation
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    // Fetch the scramble word from the API
    fetchScrambledWord();

    // Fetch the user score from the API
    fetch("../../score")
      .then((response) => response.json())
      .then((data) => setCurrentUserScore(data.score))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Function to call API and store the word details
  const fetchScrambledWord = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("../../word");
      if (!response.ok) {
        throw new Error("No words to display!");
      }
      // Extract specific values from json response
      const data = await response.json();
      setSrambledWord(data.scrambledWord);
      setOriginalWord(data.originalWord);
      setWordHint(data.wordDefinition);
      setWordCategory(data.wordCategory);
      setTotalQuestions(data.totalQuestions);
      setCorrectAnswers(data.correctAnswers);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to update user score in the API
  const updateUserScore = async () => {
    try {
      const response = await fetch("../../updateScore", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newValue: parseInt(5) }),
      });

      if (!response.ok) {
        throw new Error("Update failed!");
      }

      const data = await response.json();
      // Updating the latest score of user to display
      setCurrentUserScore(data.updatedUserScore);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to check user guess
  const checkGuess = () => {
    const parsedGuess = userGuess;
    if (parsedGuess.toLowerCase() === originalWord) {
      showCorrectAlertMessage();
      setUserGuess("");
      updateUserScore();
      fetchScrambledWord();
    } else {
      // Wrong guess
      setIsWrongGuess(true);
      showWrongAlertMessage();

      setUserGuess("");
      fetchScrambledWord();
      // Add a delay to remove the shake class animation
      setTimeout(() => {
        setIsWrongGuess(false);
      }, 1000);
    }
  };

  // Function to show the correct alert for 3 seconds
  const showCorrectAlertMessage = () => {
    setCorrectShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setCorrectShowAlert(false);
    }, 1500);
  };

  // Function to show the wrong alert for 3 seconds
  const showWrongAlertMessage = () => {
    setWrongShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setWrongShowAlert(false);
    }, 1500);
  };
  return (
    <Container>
      {showCorrectAlert && (
        <div className="Correct-Alert">
          <p>Congratulations, you guessed the word!</p>
        </div>
      )}

      {showWrongAlert && (
        <div className="Wrong-Alert">
          <p>Sorry, your guess is incorrect!</p>
        </div>
      )}
      <Row className="justify-content-md-center">
        <Col xs lg="6" md="8">
          <div
            className={isWrongGuess ? "Game-Container Shake" : "Game-Container"}
          >
            <div>
              {isLoading ? (
                <div className="Loader-Container">
                  <div class="loader"></div>
                </div>
              ) : (
                <>
                  <div className="Game-Container-Top">
                    <div className="Score-Circle">
                      <h1>{currentUserScore}</h1>
                    </div>
                    <div className="Word-Category">
                      Category{" "}
                      {wordCategory ? (
                        <span>{wordCategory}</span>
                      ) : (
                        <span>General</span>
                      )}
                    </div>

                    <div className="Scrambled-Word">
                      <h1>{scrambledWord}</h1>
                    </div>
                  </div>

                  <div className="Game-Container-Bottom">
                    <Container>
                      <Row className="justify-content-center  align-items-center">
                        <Col xs lg="8" sm="8">
                          <input
                            type="text"
                            placeholder="Your guess"
                            value={userGuess}
                            onChange={(e) => setUserGuess(e.target.value)}
                          />
                        </Col>
                        <Col xs lg="2" sm="2">
                          <button className="Guess-Button" onClick={checkGuess}>
                            <FontAwesomeIcon
                              className="Guess-Button-Icon"
                              icon={faArrowRight}
                            />
                          </button>
                        </Col>
                      </Row>
                    </Container>
                  </div>

                  {/* Hint and Statistics Modals */}
                  <div className="Game-Container-Info">
                    <Container>
                      <Row className="justify-content-between">
                        <Col xs lg="4">
                          <WordHint parameter={wordHint} />
                        </Col>
                        <Col xs lg="4">
                          <GameStatistics
                            prop1={totalQuestions - 1}
                            prop2={currentUserScore}
                            prop3={correctAnswers}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GameContainer;
