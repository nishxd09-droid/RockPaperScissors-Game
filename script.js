const choices = ['rock', 'paper', 'scissors'];
const images = {
    rock: 'rock.png',
    paper: 'paper.png',
    scissors: 'scissors.png'
};

const loseSound = new Audio('fahhhhh-3.mp3');
const winSound = new Audio('money.mp3');   
const drawSound = new Audio('bruh.mp3');  

function playSound(type) {
    if (type === 'lose') {
        loseSound.currentTime = 0;
        loseSound.play();
    } else if (type === 'win') {
        winSound.currentTime = 0;
        winSound.play();
    } else if (type === 'tie') {
        drawSound.currentTime = 0;
        drawSound.play();
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
    if (round > 3) return;

    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    const playerDisplay = document.getElementById('playerDisplay');
    const computerDisplay = document.getElementById('computerDisplay');

    playerDisplay.innerHTML = `<img src="${images[playerChoice]}" alt="${playerChoice}">`;
    computerDisplay.innerHTML = `<img src="${images[computerChoice]}" alt="${computerChoice}">`;

    playerDisplay.classList.remove('win', 'lose', 'tie');
    computerDisplay.classList.remove('win', 'lose', 'tie');

    const messages = {
        tie: `🤝 Tie! Both chose ${playerChoice}!`,
        player: `You win! ${playerChoice} beats ${computerChoice}!`,
        computer: `CPU wins! ${computerChoice} beats ${playerChoice}!`
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

    if (round > 3) {
        setTimeout(() => {
            if (playerScore > computerScore) {
                document.getElementById('result').textContent = '🏆 You won Best of 3!';
                playSound('win');
            } else if (computerScore > playerScore) {
                document.getElementById('result').textContent = '💀 CPU won Best of 3!';
                playSound('lose');
            } else {
                document.getElementById('result').textContent = '🤝 Best of 3 is a Draw!';
                playSound('tie');
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