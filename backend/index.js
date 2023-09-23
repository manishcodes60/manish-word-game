const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // To parse the JSON
const axios = require("axios"); // To make call to Externa API
const PORT = 8080; // May need to change if the PORT already in use

app.use(bodyParser.json());

// Declaring variables for global use
let score = 0;
let correctAnswers = 0;
let totalQuestions = 0;

// Function to scramble a word
function scrambleWord(word) {
  // Convert the word to an array of characters for easier manipulation
  const wordArray = word.toString().split("");

  // Algorithm to scramble the word
  for (let i = wordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  // Convert the array back to a string and return the scrambled word
  const scrambledWord = wordArray.join("");
  return scrambledWord;
}

// API to generate scramble word and details
app.get("/word", async (req, res) => {
  try {
    // Make a GET request to the external API for random word
    const responseWord = await axios.get(
      "https://random-word-api.herokuapp.com/word?length=5"
    );

    var wordDefinition;
    var wordCategory;
    const originalWord = responseWord.data.toString();
    const scrambledWord = scrambleWord(originalWord);
    totalQuestions++;
    currentWord = originalWord;

    // Make a GET request to the external API for word details
    const categoryOptions = {
      method: "GET",
      url: `https://wordsapiv1.p.rapidapi.com/words/${originalWord}/inCategory`,
      headers: {
        "X-RapidAPI-Key": "a80ac4e66fmshc648b3d34118a98p1381c2jsn98b82352887e",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    };

    const definitionOptions = {
      method: "GET",
      url: `https://wordsapiv1.p.rapidapi.com/words/${originalWord}/definitions`,
      headers: {
        "X-RapidAPI-Key": "a80ac4e66fmshc648b3d34118a98p1381c2jsn98b82352887e",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    };

    try {
      const responseWordDefinition = await axios.request(definitionOptions);
      wordDefinition =
        responseWordDefinition.data.definitions == undefined
          ? ""
          : responseWordDefinition.data.definitions[0].definition;
    } catch (error) {
      console.error("Something went wrong!");
    }

    try {
      const responseWordCategory = await axios.request(categoryOptions);
      wordCategory =
        responseWordCategory.data.inCategory === undefined
          ? ""
          : responseWordCategory.data.inCategory[0];
    } catch (error) {
      console.error("Something went wrong!");
    }

    console.log(originalWord);
    console.log(correctAnswers);

    // returning the data as json
    res.json({
      originalWord: originalWord,
      scrambledWord: scrambledWord,
      wordDefinition: wordDefinition,
      wordCategory: wordCategory,
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
    });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Something went wrong!");
    res.status(500).json({
      error: "An error occurred while fetching data from the external API.",
    });
  }
});

// API to return the user current score
app.get("/score", (req, res) => {
  res.json({ score: score });
});

// API to update the user score if the guess in correct
app.patch("/updateScore", (req, res) => {
  // Update the score if the guess is correct
  score += req.body.newValue;
  correctAnswers++;
  // return the updated score
  res.json({ updatedUserScore: score });
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
