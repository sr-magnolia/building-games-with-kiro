# � Escape del T-Rex - Huida Prehistórica

Un juego de plataformas 2D estilo pixel art donde debes escapar de un T-Rex perseguidor. Corre, salta, agáchate y esquiva obstáculos mientras el depredador más temible de la prehistoria te persigue implacablemente.

## 🎮 Cómo Jugar

1. Abre `escape-game.html` en tu navegador
2. **Selecciona tu bioma favorito**: Nieve ❄️, Desierto 🏜️ o Selva 🌴
3. Presiona el botón **¡CORRER!** o la tecla **FLECHA ARRIBA** para comenzar
4. Controles durante el juego:
   - **FLECHA ARRIBA (↑)**: Saltar
   - **FLECHA ABAJO (↓)**: Agacharse
5. Esquiva obstáculos para acelerar y alejarte del T-Rex
6. Al terminar, ingresa tu nombre para guardar tu puntuación en el Top 5
7. ¡Supera tu récord y el de otros jugadores!

## 🎯 Mecánicas del Juego

### Sistema de Velocidad Dinámica
- **Velocidad base**: 6 unidades
- **Al esquivar exitosamente**: +0.15 de velocidad (el jugador avanza 20px hacia adelante)
- **Al chocar con obstáculo**: -0.25 de velocidad (el T-Rex se acerca más)
- **Rango de velocidad**: Mínimo 3, Máximo 12
- **Multiplicador mostrado**: Velocidad actual / velocidad base

### Sistema de Persecución
- El T-Rex comienza a -250px y avanza constantemente a 0.3 unidades/frame
- **Game Over** cuando el T-Rex alcanza al jugador (distancia < 60px)
- El jugador puede moverse entre x: 150 y x: 400 según su desempeño

### Indicador de Peligro
El juego muestra el nivel de amenaza en tiempo real:
- **SEGURO** (verde): T-Rex a más de 300px de distancia
- **ALERTA** (amarillo): T-Rex entre 200-300px
- **¡PELIGRO!** (rojo pulsante): T-Rex a menos de 200px

## 🌍 Biomas Disponibles

Antes de iniciar, elige el ambiente en el que quieres jugar:

### ❄️ NIEVE
- Cielo azul claro y blanco
- Montañas grises claras
- Suelo blanco/celeste
- Nubes blancas brillantes
- Ambiente frío y sereno

### �️ DESIERTO (Por defecto)
- Cielo azul intenso
- Montañas grises
- Suelo marrón tierra
- Volcanes con humo animado
- Ambiente cálido y árido

### 🌴 SELVA
- Cielo verdoso
- Montañas verdes oscuras
- Suelo verde intenso
- Nubes verde claro
- Ambiente tropical y denso

## 🚧 Obstáculos

### 🪨 Rocas
- Obstáculos sólidos en el suelo
- **Acción requerida**: Saltar

### 🕳️ Agujeros
- Huecos negros en el suelo
- **Acción requerida**: Saltar con timing preciso

### 🌵 Cactus
- Plantas espinosas verdes con flores amarillas
- **Acción requerida**: Saltar

### 🦅 Pterodáctilos
- Dinosaurios voladores con alas animadas
- Aparecen en **3 alturas diferentes**:
  - **Alta**: Requiere saltar
  - **Media**: Requiere agacharse
  - **Baja**: Requiere agacharse
- Vuelan más rápido que la velocidad del juego (1.2x)
- Movimiento ondulante vertical

## 🏆 Sistema de Puntuación

### Récord Personal
- Se guarda automáticamente en localStorage
- Mostrado en la esquina superior derecha con borde dorado
- Persiste entre sesiones

### Top 5 Mejores Distancias
- Tabla permanente visible debajo del juego
- Al terminar una partida, ingresa tu nombre (máximo 15 caracteres)
- Los 5 mejores puntajes se guardan con:
  - Posición (con medallas 🥇🥈🥉 para los primeros 3)
  - Nombre del jugador
  - Distancia recorrida en metros
- Datos guardados en localStorage

## 🎨 Características Visuales

### Estilo Pixel Art
- Gráficos retro con renderizado pixelado
- Personajes y obstáculos dibujados con primitivas de Canvas
- Paleta de colores vibrante y nostálgica

### Efectos Visuales
- **Fondo Parallax**: 3 capas de montañas moviéndose a diferentes velocidades
- **Nubes animadas**: Se desplazan lentamente por el cielo
- **Volcanes con humo**: Solo en bioma desierto, con animación de humo
- **Screen Shake**: 
  - Al chocar con obstáculos (intensidad: 15)
  - Por proximidad del T-Rex (intensidad: 3-8 según distancia)
- **Animaciones de personajes**:
  - Jugador: Brazos y piernas en movimiento, postura de agachado
  - T-Rex: Piernas caminando, boca abierta con dientes, cresta roja
  - Pterodáctilos: Alas aleteando, movimiento ondulante

### Interfaz de Usuario
- **Durante el juego**:
  - Distancia recorrida (arriba izquierda)
  - Velocidad actual con multiplicador (arriba izquierda)
  - Récord personal (arriba derecha, dorado)
  - Indicador de peligro con colores dinámicos
  - Controles en la parte inferior

- **Pantalla de inicio**:
  - Título con emojis
  - Instrucciones claras
  - Selector de bioma con 3 botones interactivos
  - Botón principal "¡CORRER!"

- **Pantalla de Game Over**:
  - Animación de shake dramático
  - Mensaje "¡TE ATRAPÓ!" con emoji
  - Estadísticas finales (distancia y velocidad máxima)
  - Input para nombre del jugador
  - Botón "GUARDAR PUNTUACIÓN"
  - Botón "INTENTAR ESCAPAR DE NUEVO"

## 🎵 Sistema de Audio

Implementado con **Web Audio API** (sin archivos externos):

### Música de Fondo Dinámica
- Frecuencia base: 200 Hz
- Frecuencia máxima: 400 Hz
- Se intensifica según la proximidad del T-Rex
- Volumen aumenta con el peligro (0.03 a 0.10)

### Efectos de Sonido
- **Salto**: Tono descendente de 400 Hz a 200 Hz (0.1s)
- **Colisión**: Onda de sierra de 200 Hz a 50 Hz (0.3s)
- **Game Over**: Onda de sierra dramática de 300 Hz a 50 Hz (0.8s)

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas**: Renderizado de gráficos 2D
- **Vanilla JavaScript**: Lógica del juego sin dependencias
- **CSS3**: Estilos y animaciones
- **Web Audio API**: Sistema de audio generativo
- **localStorage**: Persistencia de datos

## 📁 Estructura del Proyecto

```
v4/
├── escape-game.html    # Estructura HTML del juego
├── escape-game.js      # Lógica del juego (clases y mecánicas)
├── escape-style.css    # Estilos visuales
├── README.md           # Este archivo
└── PROMPT.md           # Prompt completo para regenerar el juego
```

## 🎓 Clases Principales

- **Game**: Controlador principal, maneja estados, puntuación y audio
- **Player**: Jugador con mecánicas de salto, agacharse y animaciones
- **ChaserDino**: T-Rex perseguidor con animaciones aterradoras
- **ParallaxBackground**: Fondo multicapa con sistema de biomas
- **Ground**: Suelo con texturas según el bioma seleccionado
- **Rock**: Obstáculo de roca
- **Hole**: Obstáculo de agujero
- **Cactus**: Obstáculo de cactus
- **FlyingDino**: Pterodáctilo volador con múltiples alturas

## 🚀 Historial de Desarrollo

### Versión 4 (Actual)
- ✅ Selector de biomas (Nieve, Desierto, Selva)
- ✅ Sistema de ranking con Top 5
- ✅ Input de nombre del jugador
- ✅ Tabla de puntuaciones permanente
- ✅ Colores y ambientes personalizados por bioma

### Versión 3
- ✅ Sistema de récord personal persistente
- ✅ Pterodáctilos voladores con múltiples alturas
- ✅ Avance visual del jugador al superar obstáculos
- ✅ Mecánica de agacharse

### Versiones Anteriores
- ✅ Mecánica base de persecución
- ✅ Sistema de velocidad dinámica
- ✅ Efectos de audio generativo
- ✅ Screen shake por proximidad
- ✅ Múltiples tipos de obstáculos

## 💡 Características Destacadas

1. **Sin dependencias externas**: Todo el juego funciona con tecnologías web nativas
2. **Persistencia de datos**: Récords y rankings guardados localmente
3. **Audio generativo**: Música y efectos creados en tiempo real
4. **Responsive visual**: Efectos dinámicos según el estado del juego
5. **Múltiples biomas**: Tres ambientes completamente diferentes
6. **Sistema de ranking**: Competencia con tabla de mejores puntajes

## 🎯 Consejos para Jugar

- **Timing es clave**: Aprende los patrones de spawn de obstáculos
- **Gestiona tu velocidad**: A veces es mejor ir más lento y seguro
- **Usa el agachado**: Los pterodáctilos medios y bajos requieren agacharse
- **Observa el indicador**: El nivel de peligro te ayuda a saber cuándo arriesgar
- **Practica en diferentes biomas**: Cada uno ofrece una experiencia visual única

## 📝 Notas Técnicas

- Canvas: 900x450 píxeles
- Fuente: 'Courier New', monospace
- Renderizado: pixelated/crisp-edges
- Almacenamiento: localStorage
  - `trexEscapeHighScore`: Récord personal
  - `trexEscapeLeaderboard`: Array JSON con top 5

---

**¡Corre por tu vida y establece el récord más alto!** 🦖🏃💨
