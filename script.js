const choices = ['rock', 'paper', 'scissors'];
const images = {
    rock: 'rock.png',
    paper: 'paper.png',
    scissors: 'scissors.png'
};

// Sound effects using Web Audio API (no files needed!)
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

function playSound(type) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'win') {
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'lose') {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.setValueAtTime(200, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    } else {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }
}

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
let round = 1;

function play(playerChoice) {
    if (round > 3) return; // game over

    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    // Show choices
    const playerDisplay = document.getElementById('playerDisplay');
    const computerDisplay = document.getElementById('computerDisplay');

    playerDisplay.innerHTML = `<img src="${images[playerChoice]}" alt="${playerChoice}">`;
    computerDisplay.innerHTML = `<img src="${images[computerChoice]}" alt="${computerChoice}">`;

    // Remove old animations
    playerDisplay.classList.remove('win', 'lose', 'tie');
    computerDisplay.classList.remove('win', 'lose', 'tie');

    // Result message + animation + sound
    const messages = {
        tie: ` Tie! Both chose ${playerChoice}!`,
        player: ` You win! ${playerChoice} beats ${computerChoice}!`,
        computer: ` CPU wins! ${computerChoice} beats ${playerChoice}!`
    };

    document.getElementById('result').textContent = messages[winner];

    if (winner === 'player') {
        playerScore++;
        playerDisplay.classList.add('win');
        computerDisplay.classList.add('lose');
        playSound('win');
    } else if (winner === 'computer') {
        computerScore++;
        computerDisplay.classList.add('win');
        playerDisplay.classList.add('lose');
        playSound('lose');
    } else {
        playerDisplay.classList.add('tie');
        computerDisplay.classList.add('tie');
        playSound('tie');
    }

    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;

    round++;
    document.getElementById('roundNum').textContent = Math.min(round, 3);

    // Game over after 3 rounds
    if (round > 3) {
        setTimeout(() => {
            if (playerScore > computerScore) {
                document.getElementById('result').textContent = '🏆 You won Best of 3!';
            } else if (computerScore > playerScore) {
                document.getElementById('result').textContent = '💀 CPU won Best of 3!';
            } else {
                document.getElementById('result').textContent = '🤝 Best of 3 is a Draw!';
            }
        }, 500);
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;

    document.getElementById('playerScore').textContent = 0;
    document.getElementById('computerScore').textContent = 0;
    document.getElementById('roundNum').textContent = 1;
    document.getElementById('result').textContent = 'Choose your weapon!';
    document.getElementById('playerDisplay').innerHTML = '❓';
    document.getElementById('computerDisplay').innerHTML = '❓';

    document.getElementById('playerDisplay').classList.remove('win', 'lose', 'tie');
    document.getElementById('computerDisplay').classList.remove('win', 'lose', 'tie');
}
