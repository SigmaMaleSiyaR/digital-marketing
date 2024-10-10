let multiplier = 1;
let interval;
let betAmount = 0;
let playerScore = 0;
let leaderboard = [];
let timeElapsed = 0; // To track the passage of time for sine wave

// Get DOM elements
const plane = document.querySelector('.plane');
const multiplierDisplay = document.querySelector('.multiplier');
const placeBetBtn = document.getElementById('place-bet');
const cashOutBtn = document.getElementById('cash-out');
const messageDisplay = document.getElementById('message');
const betInput = document.getElementById('bet');
const leaderboardList = document.getElementById('leaderboard-list');

// Place bet function
placeBetBtn.addEventListener('click', () => {
    betAmount = parseFloat(betInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
        messageDisplay.textContent = 'Please enter a valid bet amount!';
        return;
    }

    startGame();
    placeBetBtn.disabled = true;
    cashOutBtn.disabled = false;
    messageDisplay.textContent = '';
});

// Start game and increase multiplier with plane moving up and down
function startGame() {
    multiplier = 1;
    multiplierDisplay.textContent = `${multiplier}x`;

    timeElapsed = 0; // Reset time elapsed when the game starts

    interval = setInterval(() => {
        multiplier += 0.1;
        multiplierDisplay.textContent = `${multiplier.toFixed(1)}x`;

        // Random chance for plane to crash (1% probability per tick)
        if (Math.random() < 0.01) {
            endGame(false);
        }

        // Update plane position based on time and sine wave function
        timeElapsed += 0.1; // Increment time
        let oscillation = Math.sin(timeElapsed) * 50; // Sine wave oscillation for smooth up and down movement
        let newPosition = (multiplier * 10) + oscillation;

        plane.style.bottom = `${newPosition}px`;
    }, 100);
}

// Cash out and calculate score
cashOutBtn.addEventListener('click', () => {
    clearInterval(interval);
    playerScore = betAmount * multiplier;
    updateLeaderboard(playerScore);
    endGame(true);
});

// End game: plane crashes
function endGame(cashedOut) {
    clearInterval(interval);

    if (!cashedOut) {
        messageDisplay.textContent = 'The plane crashed! You lost your bet.';
        playerScore = 0;
    } else {
        messageDisplay.textContent = `You cashed out at ${multiplier.toFixed(1)}x. You won ${playerScore.toFixed(2)}!`;
    }

    resetGame();
}

// Reset game state
function resetGame() {
    multiplier = 1;
    plane.style.bottom = '0px';
    placeBetBtn.disabled = false;
    cashOutBtn.disabled = true;
}

// Update leaderboard
function updateLeaderboard(score) {
    const playerName = prompt("Enter your name for the leaderboard:");

    if (playerName) {
        leaderboard.push({ name: playerName, score });
        leaderboard.sort((a, b) => b.score - a.score);
        displayLeaderboard();
    }
}

// Display leaderboard
function displayLeaderboard() {
    leaderboardList.innerHTML = '';

    leaderboard.slice(0, 5).forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>#${index + 1}</span> ${player.name} - ${player.score.toFixed(2)}`;
        leaderboardList.appendChild(listItem);
    });
}
