const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function getWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) return 'player';
    return 'computer';
}

let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    const messages = {
        tie: `It's a tie! You both chose ${playerChoice}.`,
        player: `You win! ${playerChoice} beats ${computerChoice}.`,
        computer: `Computer wins! ${computerChoice} beats ${playerChoice}.`
    };
    document.getElementById('result').textContent = `Result: ${messages[winner]}`;

    if (winner === 'player') playerScore++;
    else if (winner === 'computer') computerScore++;

    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;

    return { playerChoice, computerChoice, winner };
}

document.getElementById('playerScore').textContent = 0;
document.getElementById('computerScore').textContent = 0;

