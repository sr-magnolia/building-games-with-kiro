// ============================================
// CONFIGURACIÓN DEL JUEGO
// ============================================
const CONFIG = {
    canvas: { width: 900, height: 450 },
    player: {
        x: 200,
        width: 32,
        height: 40,
        crouchHeight: 24,
        jumpForce: -13,
        gravity: 0.65,
        groundY: 360,
        maxX: 400,
        minX: 150,
        advanceAmount: 20
    },
    chaser: {
        startX: -250,
        width: 90,
        height: 100,
        baseSpeed: 0.3,
        catchDistance: 60
    },
    obstacle: {
        minSpawnInterval: 700,
        maxSpawnInterval: 2000
    },
    game: {
        baseSpeed: 6,
        speedBoostOnSuccess: 0.15,
        speedLossOnCollision: 0.25,
        maxSpeed: 12,
        minSpeed: 3
    },
    proximity: {
        safe: 300,
        warning: 200,
        danger: 100
    }
};

// ============================================
// CLASE PRINCIPAL DEL JUEGO
// ============================================
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CONFIG.canvas.width;
        this.canvas.height = CONFIG.canvas.height;
        
        this.gameState = 'start';
        this.score = 0;
        this.speed = CONFIG.game.baseSpeed;
        this.maxSpeedReached = 1.0;
        this.highScore = this.loadHighScore();
        this.biome = 'desert'; // Bioma por defecto
        
        this.player = new Player();
        this.chaser = new ChaserDino();
        this.obstacles = [];
        this.parallaxLayers = new ParallaxBackground(this.biome);
        this.ground = new Ground(this.biome);
        
        this.lastObstacleSpawn = 0;
        this.nextObstacleSpawn = this.getRandomSpawnTime();
        this.shakeAmount = 0;
        this.proximityShake = 0;
        
        this.audioContext = null;
        this.musicOscillator = null;
        this.musicGain = null;
        this.initAudio();
        this.setupEventListeners();
        this.updateHighScoreDisplay();
        this.displayLeaderboard(this.loadLeaderboard());
        this.showStartScreen();
    }
    
    loadHighScore() {
        const saved = localStorage.getItem('trexEscapeHighScore');
        return saved ? parseInt(saved) : 0;
    }
    
    loadLeaderboard() {
        const saved = localStorage.getItem('trexEscapeLeaderboard');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveLeaderboard(leaderboard) {
        localStorage.setItem('trexEscapeLeaderboard', JSON.stringify(leaderboard));
    }
    
    addToLeaderboard(name, score) {
        let leaderboard = this.loadLeaderboard();
        leaderboard.push({ name: name, score: score });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 5); // Solo top 5
        this.saveLeaderboard(leaderboard);
        return leaderboard;
    }
    
    displayLeaderboard(leaderboard) {
        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';
        
        if (leaderboard.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3" class="no-scores">No hay puntuaciones aún</td>';
            tbody.appendChild(row);
            return;
        }
        
        leaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
            row.innerHTML = `
                <td>${medal} ${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score}m</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    saveHighScore(score) {
        localStorage.setItem('trexEscapeHighScore', Math.floor(score).toString());
    }
    
    updateHighScoreDisplay() {
        document.getElementById('high-score').textContent = `Récord: ${this.highScore}m`;
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio no disponible');
        }
    }
    
    startMusic() {
        if (!this.audioContext || this.musicOscillator) return;
        
        this.musicOscillator = this.audioContext.createOscillator();
        this.musicGain = this.audioContext.createGain();
        
        this.musicOscillator.connect(this.musicGain);
        this.musicGain.connect(this.audioContext.destination);
        
        this.musicOscillator.type = 'square';
        this.musicOscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        this.musicGain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        
        this.musicOscillator.start();
    }
    
    updateMusic(proximity) {
        if (!this.musicOscillator || !this.musicGain) return;
        
        const baseFreq = 200;
        const maxFreq = 400;
        const intensity = 1 - (proximity / CONFIG.proximity.safe);
        const freq = baseFreq + (maxFreq - baseFreq) * Math.max(0, intensity);
        
        this.musicOscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        this.musicGain.gain.setValueAtTime(0.03 + intensity * 0.07, this.audioContext.currentTime);
    }
    
    stopMusic() {
        if (this.musicOscillator) {
            this.musicOscillator.stop();
            this.musicOscillator = null;
            this.musicGain = null;
        }
    }
    
    playJumpSound() {
        if (!this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playCollisionSound() {
        if (!this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    playGameOverSound() {
        if (!this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.8);
        
        gainNode.gain.setValueAtTime(0.6, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.8);
    }

    
    setupEventListeners() {
        this.keys = {};
        
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            if (e.code === 'ArrowUp') {
                e.preventDefault();
                if (this.gameState === 'playing') {
                    this.player.jump();
                    this.playJumpSound();
                } else if (this.gameState === 'gameOver' || this.gameState === 'start') {
                    this.startGame();
                }
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Selector de bioma
        document.querySelectorAll('.biome-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.biome-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.biome = e.target.dataset.biome;
                this.parallaxLayers = new ParallaxBackground(this.biome);
                this.ground = new Ground(this.biome);
            });
        });
        
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('save-score-btn').addEventListener('click', () => {
            this.savePlayerScore();
        });
        
        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.savePlayerScore();
            }
        });
    }
    
    savePlayerScore() {
        const nameInput = document.getElementById('player-name');
        const playerName = nameInput.value.trim();
        
        if (playerName === '') {
            alert('Por favor ingresa tu nombre');
            return;
        }
        
        const finalScore = Math.floor(this.score);
        const leaderboard = this.addToLeaderboard(playerName, finalScore);
        this.displayLeaderboard(leaderboard);
        
        document.getElementById('name-input-section').classList.add('hidden');
        document.getElementById('restart-btn').style.display = 'block';
    }
    
    showStartScreen() {
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('game-over').classList.add('hidden');
    }
    
    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.speed = CONFIG.game.baseSpeed;
        this.maxSpeedReached = 1.0;
        this.player.reset();
        this.chaser.reset();
        this.obstacles = [];
        this.lastObstacleSpawn = Date.now();
        this.nextObstacleSpawn = this.getRandomSpawnTime();
        this.shakeAmount = 0;
        this.proximityShake = 0;
        
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        document.getElementById('controls-hint').style.display = 'block';
        
        this.startMusic();
        this.gameLoop();
    }
    
    getRandomSpawnTime() {
        return Math.random() * (CONFIG.obstacle.maxSpawnInterval - CONFIG.obstacle.minSpawnInterval) + CONFIG.obstacle.minSpawnInterval;
    }
    
    speedUp() {
        this.speed = Math.min(this.speed + CONFIG.game.speedBoostOnSuccess, CONFIG.game.maxSpeed);
        const speedMultiplier = this.speed / CONFIG.game.baseSpeed;
        this.maxSpeedReached = Math.max(this.maxSpeedReached, speedMultiplier);
    }
    
    advancePlayer() {
        this.player.x = Math.min(this.player.x + CONFIG.player.advanceAmount, CONFIG.player.maxX);
    }
    
    slowDown() {
        this.speed = Math.max(this.speed - CONFIG.game.speedLossOnCollision, CONFIG.game.minSpeed);
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        this.score += this.speed * 0.1;
        
        const isCrouching = this.keys['ArrowDown'] || this.keys['KeyS'];
        this.player.update(isCrouching);
        this.chaser.update();
        
        const currentTime = Date.now();
        if (currentTime - this.lastObstacleSpawn >= this.nextObstacleSpawn) {
            const obstacleType = Math.random();
            if (obstacleType < 0.3) {
                this.obstacles.push(new Rock());
            } else if (obstacleType < 0.5) {
                this.obstacles.push(new Hole());
            } else if (obstacleType < 0.75) {
                this.obstacles.push(new Cactus());
            } else {
                this.obstacles.push(new FlyingDino());
            }
            this.lastObstacleSpawn = currentTime;
            this.nextObstacleSpawn = this.getRandomSpawnTime();
        }
        
        this.obstacles.forEach((obstacle, index) => {
            obstacle.update(this.speed);
            
            if (!obstacle.passed && obstacle.x + obstacle.width < this.player.x) {
                obstacle.passed = true;
                this.speedUp();
                this.advancePlayer();
            }
            
            if (obstacle.x + obstacle.width < 0) {
                this.obstacles.splice(index, 1);
            }
            
            if (this.checkCollision(this.player, obstacle)) {
                if (!obstacle.collided) {
                    obstacle.collided = true;
                    this.shakeAmount = 15;
                    this.playCollisionSound();
                    this.slowDown();
                }
            }
        });
        
        const proximity = this.player.x - this.chaser.x;
        this.updateProximityEffects(proximity);
        this.updateMusic(proximity);
        
        if (this.chaser.x + CONFIG.chaser.catchDistance >= this.player.x) {
            this.gameOver();
        }
        
        this.parallaxLayers.update(this.speed);
        this.ground.update(this.speed);
        
        if (this.shakeAmount > 0) {
            this.shakeAmount *= 0.85;
            if (this.shakeAmount < 0.1) this.shakeAmount = 0;
        }
        
        if (this.proximityShake > 0) {
            this.proximityShake *= 0.95;
        }
        
        const speedMultiplier = (this.speed / CONFIG.game.baseSpeed).toFixed(1);
        document.getElementById('score').textContent = `Distancia: ${Math.floor(this.score)}m`;
        document.getElementById('speed').textContent = `Velocidad: ${speedMultiplier}x`;
    }
    
    updateProximityEffects(proximity) {
        const dangerLevel = document.getElementById('danger-level');
        const dangerText = document.getElementById('danger-text');
        
        if (proximity < CONFIG.proximity.danger) {
            dangerLevel.className = 'danger';
            dangerText.className = 'danger';
            dangerText.textContent = '¡PELIGRO!';
            this.proximityShake = 8;
        } else if (proximity < CONFIG.proximity.warning) {
            dangerLevel.className = 'warning';
            dangerText.className = 'warning';
            dangerText.textContent = 'ALERTA';
            this.proximityShake = 3;
        } else {
            dangerLevel.className = '';
            dangerText.className = '';
            dangerText.textContent = 'SEGURO';
            this.proximityShake = 0;
        }
    }
    
    checkCollision(player, obstacle) {
        const playerHeight = player.isCrouching ? CONFIG.player.crouchHeight : CONFIG.player.height;
        const playerY = player.isCrouching ? player.y + (CONFIG.player.height - CONFIG.player.crouchHeight) : player.y;
        
        return player.x < obstacle.x + obstacle.width - 10 &&
               player.x + player.width - 10 > obstacle.x &&
               playerY < obstacle.y + obstacle.height - 10 &&
               playerY + playerHeight - 10 > obstacle.y;
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.shakeAmount = 30;
        this.playGameOverSound();
        this.stopMusic();
        
        const finalScore = Math.floor(this.score);
        if (finalScore > this.highScore) {
            this.highScore = finalScore;
            this.saveHighScore(finalScore);
            this.updateHighScoreDisplay();
        }
        
        document.getElementById('final-score').textContent = finalScore;
        document.getElementById('max-speed').textContent = this.maxSpeedReached.toFixed(1);
        document.getElementById('game-over').classList.remove('hidden');
        document.getElementById('controls-hint').style.display = 'none';
        
        // Mostrar input de nombre y ocultar botón restart
        document.getElementById('name-input-section').classList.remove('hidden');
        document.getElementById('restart-btn').style.display = 'none';
        document.getElementById('player-name').value = '';
        document.getElementById('player-name').focus();
    }
    
    draw() {
        const totalShake = this.shakeAmount + this.proximityShake;
        const shakeX = (Math.random() - 0.5) * totalShake;
        const shakeY = (Math.random() - 0.5) * totalShake;
        
        this.ctx.save();
        this.ctx.translate(shakeX, shakeY);
        
        this.parallaxLayers.draw(this.ctx);
        this.ground.draw(this.ctx);
        this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
        this.player.draw(this.ctx);
        this.chaser.draw(this.ctx);
        
        this.ctx.restore();
    }
    
    gameLoop() {
        if (this.gameState === 'playing') {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}

// ============================================
// CLASE JUGADOR
// ============================================
class Player {
    constructor() {
        this.width = CONFIG.player.width;
        this.height = CONFIG.player.height;
        this.groundY = CONFIG.player.groundY;
        this.reset();
    }
    
    reset() {
        this.x = CONFIG.player.x;
        this.y = this.groundY;
        this.velocityY = 0;
        this.isJumping = false;
        this.isCrouching = false;
        this.animFrame = 0;
    }
    
    jump() {
        if (!this.isJumping && !this.isCrouching) {
            this.velocityY = CONFIG.player.jumpForce;
            this.isJumping = true;
        }
    }
    
    update(isCrouching) {
        this.isCrouching = isCrouching && !this.isJumping;
        
        this.velocityY += CONFIG.player.gravity;
        this.y += this.velocityY;
        
        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.velocityY = 0;
            this.isJumping = false;
        }
        
        this.animFrame = (this.animFrame + 0.25) % 4;
    }
    
    draw(ctx) {
        const drawHeight = this.isCrouching ? CONFIG.player.crouchHeight : this.height;
        const drawY = this.isCrouching ? this.y + (this.height - CONFIG.player.crouchHeight) : this.y;
        
        if (this.isCrouching) {
            ctx.fillStyle = '#d4a574';
            ctx.fillRect(this.x + 8, drawY + 8, 16, 12);
            
            ctx.fillStyle = '#3d2817';
            ctx.fillRect(this.x + 6, drawY + 6, 20, 8);
            
            ctx.fillStyle = '#000';
            ctx.fillRect(this.x + 12, drawY + 10, 3, 3);
            ctx.fillRect(this.x + 19, drawY + 10, 3, 3);
            
            ctx.fillStyle = '#8b6f47';
            ctx.fillRect(this.x + 6, drawY + 14, 24, 10);
            
            ctx.fillStyle = '#d4a574';
            ctx.fillRect(this.x + 2, drawY + 16, 8, 8);
            ctx.fillRect(this.x + 26, drawY + 16, 8, 8);
        } else {
            ctx.fillStyle = '#d4a574';
            ctx.fillRect(this.x + 8, this.y + 4, 16, 16);
            
            ctx.fillStyle = '#3d2817';
            ctx.fillRect(this.x + 6, this.y + 2, 20, 8);
            
            ctx.fillStyle = '#000';
            ctx.fillRect(this.x + 12, this.y + 10, 3, 3);
            ctx.fillRect(this.x + 19, this.y + 10, 3, 3);
            
            ctx.fillStyle = '#8b6f47';
            ctx.fillRect(this.x + 6, this.y + 20, 20, 12);
            
            ctx.fillStyle = '#d4a574';
            const armOffset = Math.sin(this.animFrame * 2) * 3;
            ctx.fillRect(this.x + 2, this.y + 22 + armOffset, 6, 10);
            ctx.fillRect(this.x + 24, this.y + 22 - armOffset, 6, 10);
            
            const legOffset = this.isJumping ? 0 : Math.sin(this.animFrame * 3) * 4;
            ctx.fillRect(this.x + 10, this.y + 32, 6, 8 + legOffset);
            ctx.fillRect(this.x + 18, this.y + 32, 6, 8 - legOffset);
        }
    }
}

// ============================================
// DINOSAURIO PERSEGUIDOR ATERRADOR
// ============================================
class ChaserDino {
    constructor() {
        this.width = CONFIG.chaser.width;
        this.height = CONFIG.chaser.height;
        this.y = CONFIG.player.groundY - this.height + 40;
        this.reset();
    }
    
    reset() {
        this.x = CONFIG.chaser.startX;
        this.animFrame = 0;
    }
    
    update() {
        this.x += CONFIG.chaser.baseSpeed;
        this.animFrame = (this.animFrame + 0.35) % 4;
    }
    
    draw(ctx) {
        ctx.fillStyle = '#8b0000';
        ctx.fillRect(this.x + 12, this.y + 25, 55, 45);
        
        ctx.fillStyle = '#a00000';
        ctx.fillRect(this.x + 55, this.y + 12, 35, 35);
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 62, this.y + 20, 8, 8);
        
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(this.x + 64, this.y + 23, 4, 4);
        
        ctx.fillStyle = '#fff';
        for (let i = 0; i < 6; i++) {
            ctx.fillRect(this.x + 56 + i * 5, this.y + 38, 4, 10);
        }
        
        ctx.fillStyle = '#6b0000';
        ctx.fillRect(this.x, this.y + 45, 25, 12);
        
        ctx.fillStyle = '#8b0000';
        const legOffset = Math.sin(this.animFrame * 2) * 5;
        ctx.fillRect(this.x + 22, this.y + 70 + legOffset, 12, 22);
        ctx.fillRect(this.x + 45, this.y + 70 - legOffset, 12, 22);
        
        ctx.fillStyle = '#a00000';
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(this.x + 18 + i * 11, this.y + 18, 7, 10);
        }
        
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(this.x + 70, this.y + 42, 15, 3);
    }
}

// ============================================
// ROCA
// ============================================
class Rock {
    constructor() {
        this.x = CONFIG.canvas.width;
        this.y = CONFIG.player.groundY + 10;
        this.width = 40;
        this.height = 35;
        this.passed = false;
        this.collided = false;
    }
    
    update(speed) {
        this.x -= speed;
    }
    
    draw(ctx) {
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(this.x + 4, this.y + 8, 32, 27);
        ctx.fillRect(this.x + 8, this.y + 4, 24, 31);
        
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(this.x + 6, this.y + 12, 12, 12);
        ctx.fillRect(this.x + 22, this.y + 18, 10, 10);
        
        ctx.fillStyle = '#7a7a7a';
        ctx.fillRect(this.x + 12, this.y + 6, 14, 10);
    }
}

// ============================================
// AGUJERO
// ============================================
class Hole {
    constructor() {
        this.x = CONFIG.canvas.width;
        this.y = CONFIG.player.groundY + 35;
        this.width = 50;
        this.height = 10;
        this.passed = false;
        this.collided = false;
    }
    
    update(speed) {
        this.x -= speed;
    }
    
    draw(ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = '#1a1a1a';
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(this.x + i * 10, this.y + 2, 8, 6);
        }
    }
}

// ============================================
// CACTUS
// ============================================
class Cactus {
    constructor() {
        this.x = CONFIG.canvas.width;
        this.y = CONFIG.player.groundY + 4;
        this.width = 32;
        this.height = 38;
        this.passed = false;
        this.collided = false;
    }
    
    update(speed) {
        this.x -= speed;
    }
    
    draw(ctx) {
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(this.x + 12, this.y + 8, 10, 30);
        
        ctx.fillStyle = '#3a6b1f';
        ctx.fillRect(this.x + 4, this.y + 14, 10, 12);
        ctx.fillRect(this.x + 20, this.y + 18, 10, 12);
        
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(this.x + 14, this.y + 10, 2, 2);
        ctx.fillRect(this.x + 16, this.y + 16, 2, 2);
        ctx.fillRect(this.x + 12, this.y + 22, 2, 2);
        ctx.fillRect(this.x + 18, this.y + 28, 2, 2);
    }
}

// ============================================
// FONDO PARALLAX
// ============================================
class ParallaxBackground {
    constructor(biome = 'desert') {
        this.biome = biome;
        this.setBiomeColors();
        this.volcanoOffset = 0;
        this.cloudX = 0;
    }
    
    setBiomeColors() {
        if (this.biome === 'snow') {
            this.skyGradient = ['#d0e8f2', '#e8f4f8', '#f0f8ff'];
            this.layers = [
                { x: 0, speed: 0.15, color: '#b8c9d9' },
                { x: 0, speed: 0.3, color: '#d0dce6' },
                { x: 0, speed: 0.5, color: '#e8f0f5' }
            ];
            this.cloudColor = 'rgba(255, 255, 255, 0.9)';
        } else if (this.biome === 'desert') {
            this.skyGradient = ['#4a9eff', '#87ceeb', '#b0d8f0'];
            this.layers = [
                { x: 0, speed: 0.15, color: '#6a6a6a' },
                { x: 0, speed: 0.3, color: '#8a8a8a' },
                { x: 0, speed: 0.5, color: '#aaaaaa' }
            ];
            this.cloudColor = 'rgba(255, 255, 255, 0.7)';
        } else if (this.biome === 'jungle') {
            this.skyGradient = ['#5a9e6f', '#7bc393', '#a8d5ba'];
            this.layers = [
                { x: 0, speed: 0.15, color: '#2d5016' },
                { x: 0, speed: 0.3, color: '#3a6b1f' },
                { x: 0, speed: 0.5, color: '#4a8028' }
            ];
            this.cloudColor = 'rgba(200, 255, 200, 0.6)';
        }
    }
    
    update(speed) {
        this.layers.forEach(layer => {
            layer.x -= speed * layer.speed;
            if (layer.x <= -CONFIG.canvas.width) {
                layer.x = 0;
            }
        });
        this.volcanoOffset = (this.volcanoOffset + 0.05) % 20;
        this.cloudX -= speed * 0.1;
        if (this.cloudX <= -CONFIG.canvas.width) {
            this.cloudX = 0;
        }
    }
    
    draw(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, CONFIG.canvas.height);
        gradient.addColorStop(0, this.skyGradient[0]);
        gradient.addColorStop(0.6, this.skyGradient[1]);
        gradient.addColorStop(1, this.skyGradient[2]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);
        
        this.drawClouds(ctx);
        
        if (this.biome === 'desert') {
            this.drawVolcano(ctx, 200, 180);
            this.drawVolcano(ctx, 650, 200);
        }
        
        this.layers.forEach((layer, index) => {
            ctx.fillStyle = layer.color;
            for (let i = -1; i <= 1; i++) {
                this.drawMountains(ctx, layer.x + i * CONFIG.canvas.width, 290 - index * 20, index);
            }
        });
    }
    
    drawClouds(ctx) {
        ctx.fillStyle = this.cloudColor;
        for (let i = 0; i < 4; i++) {
            const x = (this.cloudX + i * 250) % (CONFIG.canvas.width + 100);
            const y = 40 + i * 25;
            ctx.fillRect(x, y, 40, 15);
            ctx.fillRect(x + 10, y - 8, 25, 15);
            ctx.fillRect(x + 20, y - 12, 20, 15);
        }
    }
    
    drawVolcano(ctx, x, y) {
        ctx.fillStyle = '#6b4423';
        ctx.beginPath();
        ctx.moveTo(x, CONFIG.player.groundY + 40);
        ctx.lineTo(x - 80, CONFIG.player.groundY + 40);
        ctx.lineTo(x - 40, y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = 'rgba(100, 100, 100, 0.6)';
        for (let i = 0; i < 5; i++) {
            const smokeY = y - 20 - i * 15 - this.volcanoOffset;
            const smokeX = x - 40 + Math.sin(smokeY * 0.1) * 12;
            ctx.fillRect(smokeX, smokeY, 12, 12);
        }
    }
    
    drawMountains(ctx, startX, startY, layerIndex) {
        ctx.beginPath();
        ctx.moveTo(startX, CONFIG.player.groundY + 40);
        
        for (let x = 0; x < CONFIG.canvas.width; x += 40) {
            const height = Math.sin(x * 0.015 + layerIndex) * 20 + startY;
            ctx.lineTo(startX + x, height);
        }
        
        ctx.lineTo(startX + CONFIG.canvas.width, CONFIG.player.groundY + 40);
        ctx.closePath();
        ctx.fill();
    }
}

// ============================================
// DINOSAURIO VOLADOR (PTERODÁCTILO)
// ============================================
class FlyingDino {
    constructor() {
        this.x = CONFIG.canvas.width;
        this.width = 46;
        this.height = 32;
        
        // Tres alturas posibles: alta (requiere salto), media (requiere agacharse), baja (requiere agacharse)
        const heightOptions = [
            CONFIG.player.groundY - 80,  // Alta - jugador debe saltar
            CONFIG.player.groundY - 20,  // Media - jugador debe agacharse
            CONFIG.player.groundY + 10   // Baja - jugador debe agacharse
        ];
        this.y = heightOptions[Math.floor(Math.random() * heightOptions.length)];
        
        this.passed = false;
        this.collided = false;
        this.animFrame = 0;
        this.wingFlap = 0;
    }
    
    update(speed) {
        this.x -= speed * 1.2; // Vuela un poco más rápido
        this.animFrame = (this.animFrame + 0.3) % 8;
        this.wingFlap = Math.sin(this.animFrame) * 8;
        
        // Movimiento ondulante vertical
        this.y += Math.sin(this.animFrame * 0.5) * 0.5;
    }
    
    draw(ctx) {
        // Cuerpo del pterodáctilo
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(this.x + 15, this.y + 12, 20, 10);
        
        // Cabeza con pico
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(this.x + 32, this.y + 10, 12, 8);
        
        // Pico puntiagudo
        ctx.fillStyle = '#daa520';
        ctx.fillRect(this.x + 42, this.y + 12, 4, 4);
        
        // Ojo
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 36, this.y + 12, 2, 2);
        
        // Cresta
        ctx.fillStyle = '#ff6347';
        ctx.fillRect(this.x + 34, this.y + 8, 6, 4);
        
        // Alas (animadas)
        ctx.fillStyle = '#6b4423';
        
        // Ala izquierda
        ctx.fillRect(this.x + 8, this.y + 8 - this.wingFlap, 12, 6);
        ctx.fillRect(this.x + 4, this.y + 6 - this.wingFlap, 8, 4);
        ctx.fillRect(this.x, this.y + 4 - this.wingFlap, 6, 4);
        
        // Ala derecha
        ctx.fillRect(this.x + 28, this.y + 8 + this.wingFlap, 12, 6);
        ctx.fillRect(this.x + 36, this.y + 6 + this.wingFlap, 8, 4);
        ctx.fillRect(this.x + 42, this.y + 4 + this.wingFlap, 6, 4);
        
        // Cola
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(this.x + 10, this.y + 14, 8, 4);
        ctx.fillRect(this.x + 6, this.y + 16, 6, 6);
        
        // Patas pequeñas
        ctx.fillStyle = '#654321';
        ctx.fillRect(this.x + 20, this.y + 20, 3, 6);
        ctx.fillRect(this.x + 28, this.y + 20, 3, 6);
    }
}

// ============================================
// CLASE SUELO
// ============================================
class Ground {
    constructor(biome = 'desert') {
        this.biome = biome;
        this.x = 0;
        this.y = CONFIG.player.groundY + 40;
        this.height = 80;
        this.setBiomeColors();
    }
    
    setBiomeColors() {
        if (this.biome === 'snow') {
            this.groundColor = '#e8f4f8';
            this.detailColor = '#b8d4e8';
            this.grassColor = '#c0d8e8';
        } else if (this.biome === 'desert') {
            this.groundColor = '#8b6f47';
            this.detailColor = '#6b5436';
            this.grassColor = '#5c8a3d';
        } else if (this.biome === 'jungle') {
            this.groundColor = '#3a6b1f';
            this.detailColor = '#2d5016';
            this.grassColor = '#4a8028';
        }
    }
    
    update(speed) {
        this.x -= speed;
        if (this.x <= -40) {
            this.x = 0;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = this.groundColor;
        ctx.fillRect(0, this.y, CONFIG.canvas.width, this.height);
        
        ctx.fillStyle = this.detailColor;
        for (let i = 0; i < CONFIG.canvas.width; i += 40) {
            const offsetX = (i + this.x) % CONFIG.canvas.width;
            ctx.fillRect(offsetX, this.y + 10, 8, 8);
            ctx.fillRect(offsetX + 20, this.y + 25, 6, 6);
            ctx.fillRect(offsetX + 10, this.y + 40, 10, 10);
        }
        
        ctx.fillStyle = this.grassColor;
        for (let i = 0; i < CONFIG.canvas.width; i += 20) {
            const offsetX = (i + this.x) % CONFIG.canvas.width;
            ctx.fillRect(offsetX, this.y, 4, 8);
        }
    }
}

// ============================================
// INICIAR JUEGO
// ============================================
window.addEventListener('load', () => {
    new Game();
});
