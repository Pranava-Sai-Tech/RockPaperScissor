// Cache the DOM & reset everything to 0
let userScore = 0;
let computerScore = 0;
let gameEnded = false; // Prevents multiple win messages

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');
const newGameBtn = document.getElementById("new-game");

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

// Convert choice to title case
function convertCase(choice) {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

// Celebration function & End Game
function showEndMessage(message, emoji) {
    if (gameEnded) return; // Prevent multiple messages
    gameEnded = true;

    const endGameDiv = document.createElement("div");
    endGameDiv.classList.add("end-game");
    endGameDiv.innerHTML = `<h2>${emoji} ${message} ${emoji}</h2>`;
    document.body.appendChild(endGameDiv);

    // Disable buttons
    rock_div.style.pointerEvents = "none";
    paper_div.style.pointerEvents = "none";
    scissors_div.style.pointerEvents = "none";

    createFallingEffects();

    // Add "Start New Game" button
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Start New Game";
    restartBtn.classList.add("restart-btn");
    restartBtn.onclick = resetGame;
    document.body.appendChild(restartBtn);
}

// Function to create animated falling effects
function createFallingEffects() {
    for (let i = 0; i < 40; i++) {
        const effect = document.createElement("span");
        effect.classList.add("falling-effect");

        // Randomly select an effect symbol
        const symbols = ["🌸", "⭐", "✨"];
        effect.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

        // Random position and animation
        effect.style.left = `${Math.random() * 100}vw`;
        effect.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall speed
        effect.style.animationDelay = `${Math.random()}s`;

        document.body.appendChild(effect);

        // Remove after animation ends
        setTimeout(() => {
            effect.remove();
        }, 4000);
    }
}

// Reset game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    gameEnded = false; // Reset game state

    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_div.innerHTML = `<p>Game restarted. Make your move!</p>`;

    // Enable buttons
    rock_div.style.pointerEvents = "auto";
    paper_div.style.pointerEvents = "auto";
    scissors_div.style.pointerEvents = "auto";

    // Remove end game message & restart button
    document.querySelector(".end-game")?.remove();
    document.querySelector(".restart-btn")?.remove();
}

// Winning function
function win(user, computer) {
    if (gameEnded) return; // Prevent extra clicks
    userScore++;
    userScore_span.innerHTML = userScore;
    result_div.innerHTML = `<p>${convertCase(user)} (user) beats ${convertCase(computer)} (comp). You win!</p>`;

    if (userScore === 7) {
        showEndMessage("🎉 Congratulations! You Win! 🎉", "🎉");
    }
}

// Losing function
function loses(user, computer) {
    if (gameEnded) return; // Prevent extra clicks
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_div.innerHTML = `<p>${convertCase(computer)} (comp) beats ${convertCase(user)} (user). You lose!</p>`;

    if (computerScore === 7) {
        showEndMessage("💀 Computer Wins! You Failed! Try Again. 💀", "💀");
    }
}

// Draw function
function draw(user) {
    result_div.innerHTML = `<p>It was a draw! You both chose ${convertCase(user)}</p>`;
}

// Game logic
function game(userChoice) {
    if (gameEnded) return; // Stop playing if game ended
    const computerChoice = getComputerChoice();

    switch (userChoice + computerChoice) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            win(userChoice, computerChoice);
            break;
        case 'rockpaper':
        case 'scissorsrock':
        case 'paperscissors':
            loses(userChoice, computerChoice);
            break;
        default:
            draw(userChoice);
    }
}

// Event listeners
function main() {
    rock_div.addEventListener('click', () => game('rock'));
    paper_div.addEventListener('click', () => game('paper'));
    scissors_div.addEventListener('click', () => game('scissors'));
    newGameBtn.addEventListener("click", resetGame);
}

// Wait until DOM is fully loaded before running JS
document.addEventListener("DOMContentLoaded", function() {
    main();
});
