const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverDiv = document.getElementById('gameOver');
const scoreDiv = document.getElementById('score');
const finalScoreP = document.getElementById('finalScore');

let caveman = {
    x: 400,
    y: 300,
    size: 30,
    speed: 4
};

let dinosaur = {
    x: 50,
    y: 50,
    size: 40,
    speed: 2.5
};

let keys = {};
let gameRunning = true;
let startTime = Date.now();
let score = 0;

// Controles
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawCaveman() {
    // Cuerpo
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(caveman.x - 10, caveman.y, 20, 25);
    
    // Cabeza
    ctx.fillStyle = '#F4A460';
    ctx.beginPath();
    ctx.arc(caveman.x, caveman.y - 5, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Pelo
    ctx.fillStyle = '#654321';
    ctx.fillRect(caveman.x - 12, caveman.y - 15, 24, 12);
    
    // Piernas
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(caveman.x - 8, caveman.y + 25, 6, 15);
    ctx.fillRect(caveman.x + 2, caveman.y + 25, 6, 15);
}

function drawDinosaur() {
    // Cuerpo
    ctx.fillStyle = '#228B22';
    ctx.fillRect(dinosaur.x - 15, dinosaur.y, 30, 30);
    
    // Cabeza
    ctx.fillStyle = '#2E8B57';
    ctx.fillRect(dinosaur.x + 10, dinosaur.y - 10, 20, 20);
    
    // Ojos
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(dinosaur.x + 22, dinosaur.y - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Cola
    ctx.fillStyle = '#228B22';
    ctx.fillRect(dinosaur.x - 25, dinosaur.y + 10, 15, 10);
    
    // Piernas
    ctx.fillStyle = '#2E8B57';
    ctx.fillRect(dinosaur.x - 10, dinosaur.y + 30, 8, 12);
    ctx.fillRect(dinosaur.x + 2, dinosaur.y + 30, 8, 12);
    
    // Espinas
    ctx.fillStyle = '#FF6347';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(dinosaur.x - 10 + i * 10, dinosaur.y);
        ctx.lineTo(dinosaur.x - 5 + i * 10, dinosaur.y - 8);
        ctx.lineTo(dinosaur.x + i * 10, dinosaur.y);
        ctx.fill();
    }
}

function moveCaveman() {
    if (keys['ArrowUp'] || keys['w']) caveman.y -= caveman.speed;
    if (keys['ArrowDown'] || keys['s']) caveman.y += caveman.speed;
    if (keys['ArrowLeft'] || keys['a']) caveman.x -= caveman.speed;
    if (keys['ArrowRight'] || keys['d']) caveman.x += caveman.speed;
    
    // Límites
    caveman.x = Math.max(caveman.size, Math.min(canvas.width - caveman.size, caveman.x));
    caveman.y = Math.max(caveman.size, Math.min(canvas.height - caveman.size, caveman.y));
}

function moveDinosaur() {
    const dx = caveman.x - dinosaur.x;
    const dy = caveman.y - dinosaur.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
        dinosaur.x += (dx / distance) * dinosaur.speed;
        dinosaur.y += (dy / distance) * dinosaur.speed;
    }
}

function checkCollision() {
    const dx = caveman.x - dinosaur.x;
    const dy = caveman.y - dinosaur.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < (caveman.size + dinosaur.size) / 2;
}

function updateScore() {
    score = Math.floor((Date.now() - startTime) / 1000);
    scoreDiv.textContent = `Tiempo: ${score}s`;
}

function gameOver() {
    gameRunning = false;
    gameOverDiv.style.display = 'block';
    finalScoreP.textContent = `Sobreviviste ${score} segundos`;
}

function gameLoop() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    moveCaveman();
    moveDinosaur();
    
    drawCaveman();
    drawDinosaur();
    
    updateScore();
    
    if (checkCollision()) {
        gameOver();
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

function restartGame() {
    caveman.x = 400;
    caveman.y = 300;
    dinosaur.x = 50;
    dinosaur.y = 50;
    gameRunning = true;
    startTime = Date.now();
    score = 0;
    gameOverDiv.style.display = 'none';
    gameLoop();
}

// Iniciar juego
gameLoop();
