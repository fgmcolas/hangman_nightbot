const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const wordsData = require("./words.json");
const words = wordsData.words;

let secretWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
let revealedLetters = Array(secretWord.length).fill("_").map(() => "_");
let attemptsLeft = 6;
let guessedLetters = new Set();

app.get("/", (req, res) => {
    res.send("🎮 API du jeu du pendu est en ligne !");
});

app.get("/pendu", (req, res) => {
    const guess = req.query.letter?.toUpperCase();

    if (!guess) {
        return res.send("❌ Donne une lettre ou un mot valide !");
    }

    if (guess.length > 1) {
        if (guess === secretWord) {
            let wordFound = secretWord;
            resetGame();
            return res.send(`🎉 Bravo ! Le mot était *${wordFound}*. Un nouveau mot a été choisi.`);
        } else {
            attemptsLeft--;
        }
    } else {
        if (!/[a-z]/.test(guess) || guessedLetters.has(guess)) {
            return res.send(`🔄 Lettre invalide ou déjà utilisée : ${revealedLetters.join(" ")}`);
        }
        guessedLetters.add(guess);
        if (secretWord.includes(guess)) {
            for (let i = 0; i < secretWord.length; i++) {
                if (secretWord[i] === guess) revealedLetters[i] = guess;
            }
        } else {
            attemptsLeft--;
        }
    }

    if (!revealedLetters.includes("_")) {
        let wordFound = secretWord;
        resetGame();
        return res.send(`🎉 Bravo ! Le mot était *${wordFound}*. Un nouveau mot a été choisi.`);
    }

    if (attemptsLeft === 0) {
        let lostWord = secretWord;
        resetGame();
        return res.send(`💀 Perdu ! Le mot était *${lostWord}*. Un nouveau mot a été choisi.`);
    }
    res.send(`✏️ ${revealedLetters.join(" ")} | ❤️ Vies restantes : ${attemptsLeft}`);
});

function resetGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    revealedLetters = Array(secretWord.length).fill("_");
    attemptsLeft = 6;
    guessedLetters.clear();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur du Pendu lancé sur le port ${PORT}`));
