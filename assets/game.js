const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
/* we will need the gamecontainer to make it blurry*/
/* when we display the end menu*/
const gameContainer = document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = '/assets/bird1.png';

// Game constans
const FLAP_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

// Bird variable
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;


//Pipe variable
let pipeX = 400;
let pipeY = canvas.height - 200;

//score and highScore variable
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;
//
//
let scored 

//


//
document.body.onkeyup = function (e) {
    if (e.code == 'Space') {
        birdVelocity = FLAP_SPEED;
    }
}
// 
document.getElementById('restart-button').addEventListener("click", function(e){
    hideEndMenu();
    resetGame();
    loop();
});



function increaseScore() {
    //
    if (birdX > pipeX + PIPE_WIDTH &&
        (birdY < pipeY + PIPE_GAP ||
            birdY + BIRD_HEIGHT > pipeY + PIPE_GAP)&&
            !scored) {
            score++;
            scoreDiv.innerHTML = score;
            scored = true; 
    }
    //
    if( birdX < pipeX + PIPE_WIDTH){
scored = false;
    }
}
function collisionCheck() {
    // Create bounding Boxes for the bird and the pipes
    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT
    }

    const topPipeBox = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: pipeY
    }
    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY - PIPE_GAP
    }
    // Check for collison with upper pipe box 
    if (
        birdBox.x + birdBox.width > topPipeBox.x &&
        birdBox.x < topPipeBox.x + topPipeBox.width &&
        birdBox.y < topPipeBox.y) {
        return true;
    }
    // Check for collision with lower pipe box
    if (birdBox.x + birdBox.width > bottomPipeBox.x &&
        birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        birdBox.y + birdBox.height > bottomPipeBox.y) {

        return true;
    }
    //Check if bird hits boundaries
    if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
        return false;
    }


    return false;

}

function hideEndMenu() {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}


function showEndMenu() {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
    //asd
    //
    if (highScore < score) {
        highScore = score;

    }
    document.getElementById('best-score').innerHTML = highScore;
   
}

function resetGame() {

    birdX = 40;
    birdY = 40;
    birdVelocity = 0;
    birdAcceleration = 0.1;


    pipeX = 400;
    pipeY = canvas.height - 200;

score =0 ;
}
function endGame() {
    showEndMenu();
}
function loop() {
    //reset the ctx after every loop iteration
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Draw Flappy Bird
    ctx.drawImage(flappyImg, birdX, birdY);

    //Draw Pipes
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

    // now we would need to add on collision check to display our end-menu
    // and end the game
    // the collisionCheck will returnk us true if we 
    if (collisionCheck()) {
        endGame();
        return;
    }


    // forgot to move the pipes
    pipeX -= 2;
    // if the pipe moves out of the frame we need reset the pipe
    if (pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
    }



    //apply gravity to the bird and let it move
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    increaseScore();
    requestAnimationFrame(loop);
}
loop();