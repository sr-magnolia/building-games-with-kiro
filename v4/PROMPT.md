# 🦖 Prompt: Escape del T-Rex - Huida Prehistórica

Crea un juego de plataformas 2D estilo pixel art donde el jugador debe escapar de un T-Rex perseguidor. El juego debe tener una vibra retro intensa, con efectos visuales dramáticos y un sistema de velocidad dinámica que recompensa la habilidad.

## 🎮 Concepto Core

Un runner infinito donde NO ganas, solo sobrevives. El T-Rex SIEMPRE avanza hacia ti. Tu única esperanza es esquivar obstáculos para acelerar y mantener la distancia. Cada error te acerca más a las fauces del depredador.

## 🎯 Mecánicas Fundamentales

### Sistema de Velocidad Dinámica
- Velocidad base: 6 unidades
- Esquivar obstáculo exitosamente: +0.15 velocidad + jugador avanza 20px hacia adelante
- Chocar con obstáculo: -0.25 velocidad (el T-Rex se acerca)
- Rango: mínimo 3, máximo 12
- Mostrar multiplicador en UI (velocidad actual / velocidad base)

### Persecución Implacable
- T-Rex comienza en x: -250
- Avanza constantemente a 0.3 unidades/frame
- Game Over cuando alcanza al jugador (distancia < 60px)
- El jugador puede moverse entre x: 150 y x: 400 según su desempeño

### Controles
- FLECHA ARRIBA: Saltar (solo si está en el suelo)
- FLECHA ABAJO: Agacharse (mientras se mantiene presionada)

## 🌍 Sistema de Biomas (Selección Pre-Juego)

Antes de iniciar, el jugador elige entre 3 biomas:

### ❄️ NIEVE
- Cielo: gradiente azul claro (#d0e8f2 → #e8f4f8 → #f0f8ff)
- Montañas: grises claras (#b8c9d9, #d0dce6, #e8f0f5)
- Suelo: blanco/celeste (#e8f4f8)
- Nubes: blancas brillantes (rgba(255, 255, 255, 0.9))

### 🏜️ DESIERTO (por defecto)
- Cielo: azul intenso (#4a9eff → #87ceeb → #b0d8f0)
- Montañas: grises (#6a6a6a, #8a8a8a, #aaaaaa)
- Suelo: marrón tierra (#8b6f47)
- Volcanes: con humo animado
- Nubes: blancas semi-transparentes (rgba(255, 255, 255, 0.7))

### 🌴 SELVA
- Cielo: verdoso (#5a9e6f → #7bc393 → #a8d5ba)
- Montañas: verdes oscuras (#2d5016, #3a6b1f, #4a8028)
- Suelo: verde intenso (#3a6b1f)
- Nubes: verde claro (rgba(200, 255, 200, 0.6))

## 🚧 Obstáculos (Spawn Aleatorio)

### 🪨 Rocas (30% probabilidad)
- Tamaño: 40x35px
- Posición: suelo
- Acción: saltar

### 🕳️ Agujeros (20% probabilidad)
- Tamaño: 50x10px
- Posición: suelo
- Acción: saltar con timing

### 🌵 Cactus (25% probabilidad)
- Tamaño: 32x38px
- Posición: suelo
- Acción: saltar

### 🦅 Pterodáctilos (25% probabilidad)
- Tamaño: 46x32px
- 3 alturas aleatorias:
  - Alta (groundY - 80): requiere saltar
  - Media (groundY - 20): requiere agacharse
  - Baja (groundY + 10): requiere agacharse
- Velocidad: 1.2x la velocidad del juego
- Animación: alas aleteando, movimiento ondulante vertical

### Sistema de Spawn
- Intervalo aleatorio: 700ms a 2000ms entre obstáculos
- Aparecen en x: 900 (borde derecho del canvas)

## 🎨 Estilo Visual

### Canvas
- Tamaño: 900x450px
- Renderizado: pixelated/crisp-edges
- Borde: 6px sólido #ff3333 con glow rojo

### Personajes Pixel Art

#### Jugador (Humano Prehistórico)
- Tamaño normal: 32x40px
- Tamaño agachado: 32x24px
- Colores: piel (#d4a574), pelo (#3d2817), ropa (#8b6f47)
- Animaciones:
  - Correr: brazos y piernas alternando
  - Saltar: pose estática en el aire
  - Agacharse: cuerpo comprimido, cabeza hacia adelante

#### T-Rex Perseguidor (ATERRADOR)
- Tamaño: 90x100px
- Colores: rojo oscuro (#8b0000), rojo (#a00000), rojo brillante (#ff0000)
- Detalles:
  - Boca abierta con dientes blancos afilados
  - Ojo rojo con pupila amarilla
  - Cresta roja en la espalda
  - Piernas gruesas animadas
  - Lengua roja saliendo de la boca
- Animación: piernas caminando, cuerpo balanceándose

### Fondo Parallax (3 capas)
- Capa 1 (más lejana): velocidad 0.15x, montañas grandes
- Capa 2 (media): velocidad 0.3x, montañas medianas
- Capa 3 (cercana): velocidad 0.5x, montañas pequeñas
- Nubes: se mueven a 0.1x velocidad
- Volcanes (solo desierto): con humo animado ascendente

### Suelo
- Altura: 80px desde y: 400
- Textura: patrón repetitivo con detalles según bioma
- Pasto/detalles: líneas verticales pequeñas

## 🎵 Sistema de Audio (Web Audio API)

### Música de Fondo Dinámica
- Oscilador tipo 'square'
- Frecuencia base: 200 Hz
- Frecuencia máxima: 400 Hz (cuando el T-Rex está cerca)
- Volumen: 0.03 a 0.10 según proximidad
- Se intensifica cuanto más cerca está el T-Rex

### Efectos de Sonido
- Salto: tono descendente 400Hz → 200Hz (0.1s)
- Colisión: onda de sierra 200Hz → 50Hz (0.3s)
- Game Over: onda de sierra dramática 300Hz → 50Hz (0.8s)

## 📊 UI e Indicadores

### Durante el Juego
- Arriba izquierda:
  - Distancia: "Distancia: Xm"
  - Velocidad: "Velocidad: X.Xx"
- Arriba derecha:
  - Récord: "Récord: Xm" (borde dorado, glow amarillo)
- Indicador de Peligro (arriba izquierda, debajo de velocidad):
  - SEGURO (verde): T-Rex > 300px
  - ALERTA (amarillo pulsante): T-Rex 200-300px
  - ¡PELIGRO! (rojo pulsante intenso): T-Rex < 200px
- Abajo centro: "↑: SALTAR | ↓: AGACHARSE"

### Pantalla de Inicio
- Título: "🦖 ESCAPE DEL T-REX 🏃"
- Subtítulo: "¡Corre por tu vida!"
- Instrucciones: "↑: Saltar | ↓: Agacharse"
- Hint: "Esquiva obstáculos para acelerar y alejarte del T-Rex"
- Warning: "Si chocas, el T-Rex se acercará más..."
- Selector de Bioma:
  - Título: "Selecciona tu bioma:"
  - 3 botones: "❄️ NIEVE", "🏜️ DESIERTO", "🌴 SELVA"
  - Botón seleccionado: fondo verde (#00ff88), glow verde
- Botón principal: "¡CORRER!"

### Pantalla de Game Over
- Animación: shake dramático (0.5s)
- Título: "¡TE ATRAPÓ!" (rojo, grande)
- Subtítulo: "🦖 El T-Rex te alcanzó 🦴" (amarillo, bounce animation)
- Estadísticas:
  - "Distancia recorrida: Xm"
  - "Velocidad máxima: X.Xx"
- Input de nombre:
  - Prompt: "Ingresa tu nombre:"
  - Input: máximo 15 caracteres, placeholder "Tu nombre"
  - Botón: "GUARDAR PUNTUACIÓN" (verde #00ff88)
- Botón: "INTENTAR ESCAPAR DE NUEVO"

## 🏆 Sistema de Puntuación

### Récord Personal
- Guardado en localStorage: 'trexEscapeHighScore'
- Mostrado en esquina superior derecha
- Borde dorado con glow
- Persiste entre sesiones

### Top 5 Mejores Distancias
- Guardado en localStorage: 'trexEscapeLeaderboard' (array JSON)
- Tabla visible debajo del juego:
  - Columnas: Pos | Nombre | Distancia
  - Medallas: 🥇🥈🥉 para top 3
  - Estilo: fondo negro semi-transparente, borde dorado
  - Hover: fondo dorado semi-transparente
- Al terminar partida:
  - Mostrar input para nombre
  - Guardar puntuación al presionar botón o Enter
  - Actualizar tabla inmediatamente
  - Ocultar input y mostrar botón restart

## 💥 Efectos Visuales

### Screen Shake
- Al chocar: intensidad 15, decay 0.85
- Por proximidad del T-Rex:
  - < 100px: shake 8
  - < 200px: shake 3
  - Decay: 0.95
- Aplicar a todo el canvas con translate

### Animaciones CSS
- Botones: scale 1.08 en hover, translateY en active
- Indicador de peligro: pulse animation según nivel
- Game Over: shake dramático
- Subtítulo dramático: bounce infinito

## 🛠️ Estructura Técnica

### Clases Principales
- Game: controlador principal, estados, puntuación, audio
- Player: mecánicas de movimiento, animaciones
- ChaserDino: T-Rex perseguidor
- ParallaxBackground: fondo multicapa con biomas
- Ground: suelo con texturas por bioma
- Rock, Hole, Cactus, FlyingDino: obstáculos

### Estados del Juego
- 'start': pantalla inicial con selector de bioma
- 'playing': juego activo
- 'gameOver': pantalla final con input de nombre

### Configuración (objeto CONFIG)
```javascript
{
  canvas: { width: 900, height: 450 },
  player: {
    x: 200, width: 32, height: 40, crouchHeight: 24,
    jumpForce: -13, gravity: 0.65, groundY: 360,
    maxX: 400, minX: 150, advanceAmount: 20
  },
  chaser: {
    startX: -250, width: 90, height: 100,
    baseSpeed: 0.3, catchDistance: 60
  },
  obstacle: {
    minSpawnInterval: 700, maxSpawnInterval: 2000
  },
  game: {
    baseSpeed: 6, speedBoostOnSuccess: 0.15,
    speedLossOnCollision: 0.25, maxSpeed: 12, minSpeed: 3
  },
  proximity: { safe: 300, warning: 200, danger: 100 }
}
```

## 🎯 Detalles de Implementación

### Colisiones
- Hitbox reducida: -10px en cada lado para ser más permisivo
- Considerar altura de agachado al detectar colisiones
- Marcar obstáculos como 'passed' cuando el jugador los supera
- Marcar como 'collided' para evitar múltiples penalizaciones

### Puntuación
- Incremento: velocidad * 0.1 por frame
- Mostrar en metros (Math.floor)
- Guardar récord si supera el anterior
- Agregar a leaderboard con nombre del jugador

### Persistencia
- localStorage para récord y leaderboard
- Leaderboard: array de objetos {name, score}
- Ordenar por score descendente
- Mantener solo top 5

## 🎨 Paleta de Colores

### UI
- Fondo: gradiente negro (#0a0a0a → #1a1a1a)
- Borde principal: #ff3333 (rojo)
- Botones: #ff6b35 (naranja)
- Texto: #ffffff (blanco)
- Récord: #ffd700 (dorado)
- Éxito: #00ff88 (verde)
- Alerta: #ffcc00 (amarillo)
- Peligro: #ff3333 (rojo)

### Personajes
- Jugador: #d4a574 (piel), #3d2817 (pelo), #8b6f47 (ropa)
- T-Rex: #8b0000, #a00000, #ff0000 (rojos)
- Pterodáctilo: #8b4513 (marrón), #a0522d (marrón claro)

### Obstáculos
- Roca: #5a5a5a, #3a3a3a, #7a7a7a (grises)
- Agujero: #000000, #1a1a1a (negros)
- Cactus: #2d5016, #3a6b1f (verdes), #ffff00 (flores)

## 📝 Archivos a Generar

1. escape-game.html: estructura HTML con canvas, UI, pantallas
2. escape-game.js: toda la lógica del juego (clases, mecánicas)
3. escape-style.css: estilos visuales, animaciones, responsive
4. README.md: documentación completa del juego

## 🚀 Vibecoding Tips

- Todo debe sentirse URGENTE y DRAMÁTICO
- El T-Rex es ATERRADOR, no lindo
- Los efectos visuales deben ser INTENSOS
- La música debe ponerte NERVIOSO
- Cada colisión debe DOLER
- El screen shake es tu MEJOR AMIGO
- Los colores deben ser VIBRANTES
- Las animaciones deben ser FLUIDAS
- El pixel art debe ser NÍTIDO
- La UI debe ser CLARA y LEGIBLE
- El selector de biomas debe ser INTUITIVO
- El sistema de ranking debe dar GANAS DE COMPETIR

## 🎮 Experiencia del Jugador

1. Abrir el juego → Pantalla de inicio épica
2. Elegir bioma favorito → Ambiente personalizado
3. Presionar ¡CORRER! → Música intensa comienza
4. Esquivar obstáculos → Adrenalina pura
5. Ver al T-Rex acercarse → Pánico controlado
6. Cometer un error → Shake dramático, T-Rex más cerca
7. Recuperarse → Acelerar de nuevo, alejarse
8. Finalmente ser atrapado → Game Over épico
9. Ingresar nombre → Competir en el ranking
10. Ver tu posición → Ganas de jugar de nuevo

---

**Genera un juego que haga que el jugador sienta que realmente está huyendo por su vida. Cada segundo debe importar. Cada decisión debe tener peso. El T-Rex debe ser una amenaza constante y aterradora. Los biomas deben ofrecer variedad visual sin cambiar la mecánica core. El sistema de ranking debe motivar a mejorar. ¡Hazlo ÉPICO!** 🦖🔥
