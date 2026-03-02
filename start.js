const clickSound = new Audio('engine-start.mp3'); 

document.querySelector('.play-btn').addEventListener('click', function (e) {
    e.preventDefault();

    clickSound.currentTime = 0;
    clickSound.play();

    setTimeout(() => {
        document.querySelector('.intro-content').style.animation = 'fadeOut 0.5s ease forwards';
    }, 9500); 

    setTimeout(() => {
        window.location.href = 'game.html';
    }, 10000); 
});