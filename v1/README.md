# Juego: Dinosaurio vs Cavernícola

## Descripción
Juego simple desarrollado con HTML5 Canvas y JavaScript vanilla donde un dinosaurio persigue a un cavernícola. El objetivo es sobrevivir el mayor tiempo posible sin ser atrapado.

## Prompt utilizado para generar el juego
```
genera un juego donde un dinosaurio persigue a un cabernicola, si lo alcanza el juego termina
```

## Archivos generados

### 1. `index.html`
Archivo principal del juego que contiene:
- Estructura HTML básica
- Estilos CSS para el canvas, interfaz de juego y pantalla de game over
- Canvas de 800x600 píxeles con fondo verde (césped)
- Interfaz de puntuación y pantalla de fin de juego
- Diseño responsive centrado en la pantalla

### 2. `game.js`
Lógica del juego implementada en JavaScript:
- **Personajes:**
  - Cavernícola: controlado por el jugador, velocidad 4 px/frame
  - Dinosaurio: persigue automáticamente al cavernícola, velocidad 2.5 px/frame
  
- **Funciones principales:**
  - `drawCaveman()`: Dibuja el cavernícola con cuerpo, cabeza, pelo y piernas
  - `drawDinosaur()`: Dibuja el dinosaurio con cuerpo, cabeza, ojos, cola, piernas y espinas
  - `moveCaveman()`: Maneja el movimiento del jugador con límites del canvas
  - `moveDinosaur()`: Implementa la persecución usando cálculo de distancia
  - `checkCollision()`: Detecta colisión entre personajes
  - `gameLoop()`: Loop principal del juego
  - `restartGame()`: Reinicia el juego

- **Controles:**
  - Flechas del teclado (↑ ↓ ← →)
  - Teclas WASD

- **Sistema de puntuación:**
  - Contador de tiempo en segundos
  - Muestra el tiempo sobrevivido al finalizar

## Cómo jugar

1. Abre el archivo `index.html` en tu navegador web
2. Usa las flechas del teclado o WASD para mover al cavernícola
3. Evita que el dinosaurio te atrape
4. Intenta sobrevivir el mayor tiempo posible
5. Cuando pierdas, haz clic en "Jugar de nuevo" para reintentar

## Características técnicas

- **Tecnologías:** HTML5, CSS3, JavaScript (ES6)
- **Renderizado:** Canvas 2D API
- **Física:** Sistema de persecución basado en vectores de dirección
- **Detección de colisión:** Cálculo de distancia euclidiana
- **Sin dependencias:** No requiere librerías externas

## Requisitos

- Navegador web moderno con soporte para HTML5 Canvas
- JavaScript habilitado

## Posibles mejoras futuras

- Añadir obstáculos en el mapa
- Implementar niveles de dificultad
- Agregar power-ups
- Sistema de puntuación máxima (high score)
- Efectos de sonido
- Animaciones más elaboradas
- Modo multijugador
