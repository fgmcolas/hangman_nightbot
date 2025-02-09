# Hangman Game API - Hearthstone Edition

This project is a simple API for playing a Hangman game with words from the **Hearthstone** universe. Players guess letters, and the API responds with the current state of the word until it is fully guessed.

## Features
- Randomly selects a word from a Hearthstone-themed word list.
- Tracks guessed letters and reveals progress.
- Notifies players of incorrect guesses.
- Designed for integration with **Nightbot** or other chatbot systems.

## Installation

```sh
git clone https://github.com/fgmcolas/hanged_man_nightbot.git
cd hangman-hearthstone
npm install
```

## Running the API

```sh
npm start
```

The server will start on port 3000 or the value of process.env.PORT if set.
API Endpoints
GET /

Returns a simple message indicating the API is online.
GET /hangman?letter={your_guess}

- If the letter is correct, updates the word progress.
- If the letter is incorrect, reduces the remaining attempts.
- If the word is completely guessed, resets with a new word.
- If all attempts are used, the game resets with a new word.

## Deployment

The API is deployed on Render at:
[https://hanged-man-nightbot.onrender.com/](https://hanged-man-nightbot.onrender.com/)

## Using with Nightbot
To integrate this API with Nightbot, create a custom command with the following format:
```sh
!addcom !pendu $(urlfetch https://hanged-man-nightbot.onrender.com/pendu?letter=$(query))
```

Players can guess letters using !hangman <letter> in chat.

Enjoy the game! 🎮🔥
