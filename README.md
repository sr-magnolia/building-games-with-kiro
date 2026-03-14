# 🦖 Escape del T-Rex - Colección de Juegos Prehistóricos

Una colección evolutiva de juegos de persecución con temática prehistórica desarrollados con HTML5, CSS3 y JavaScript vanilla. Cuatro versiones que muestran la progresión desde un concepto simple hasta un juego completo con múltiples características.

## 📁 Estructura del Proyecto

```
├── v1/                    # Versión 1: Juego de persecución clásico
│   ├── index.html
│   ├── game.js
│   └── README.md
│
├── v2/                    # Versión 2: Endless runner básico
│   ├── escape-game.html
│   ├── escape-game.js
│   ├── escape-style.css
│   └── README.md
│
├── v3/                    # Versión 3: Runner con récords y pterodáctilos
│   ├── escape-game.html
│   ├── escape-game.js
│   ├── escape-style.css
│   └── README.md
│
└── v4/                    # Versión 4: Edición completa con biomas y ranking 🆕
    ├── escape-game.html
    ├── escape-game.js
    ├── escape-style.css
    ├── README.md
    └── PROMPT.md          # Prompt completo para regenerar el juego
```

## 🎮 Versiones del Juego

### V1: Dinosaurio vs Cavernícola
**Tipo:** Juego de persecución multidireccional

Un juego simple donde controlas a un cavernícola que debe escapar de un dinosaurio que lo persigue inteligentemente por todo el mapa.

**Características:**
- Control total del cavernícola (↑ ↓ ← → o WASD)
- IA de persecución del dinosaurio
- Sistema de puntuación por tiempo sobrevivido
- Gráficos dibujados con Canvas 2D
- Sin dependencias externas

**Cómo jugar:**
1. Abre `v1/index.html` en tu navegador
2. Usa las flechas o WASD para moverte
3. Evita que el dinosaurio te atrape
4. ¡Sobrevive el mayor tiempo posible!

[Ver documentación completa →](v1/README.md)

---

### V2: Escape del T-Rex (Vibecoding Edition)
**Tipo:** Endless runner con mecánicas dinámicas

Una huida frenética donde el cavernícola corre automáticamente mientras un T-Rex lo persigue. El juego se adapta a tu rendimiento: esquiva obstáculos para acelerar y alejarte, o choca y siente cómo el dinosaurio se acerca.

**Características:**
- Velocidad dinámica basada en rendimiento
- Screen shake cuando el dinosaurio está cerca
- Música generativa que se intensifica con el peligro
- Obstáculos variados (rocas y agujeros)
- Arte pixel-art retro
- Sistema de audio con Web Audio API

**Cómo jugar:**
1. Abre `v2/escape-game.html` en tu navegador
2. Presiona cualquier tecla para comenzar
3. Usa ↑ para saltar y ↓ para agacharte
4. Esquiva obstáculos para acelerar
5. ¡No dejes que el T-Rex te alcance!

[Ver documentación completa →](v2/README.md)

---

### V3: Escape del T-Rex - Edición Mejorada
**Tipo:** Endless runner con récords y obstáculos aéreos

Versión mejorada con sistema de récords persistente y nuevos desafíos aéreos que requieren estrategia adicional.

**Características:**
- 🦅 **Pterodáctilos voladores** a diferentes alturas
- � **Sistema de récord personal** guardado en localStorage
- 📊 **Avance visual** del jugador al superar obstáculos
- 🌵 **Más obstáculos**: Rocas, agujeros, cactus y dinosaurios voladores
- Todas las características de V2 (velocidad dinámica, música, efectos)

**Cómo jugar:**
1. Abre `v3/escape-game.html` en tu navegador
2. Usa ↑ para saltar y ↓ para agacharte
3. Esquiva obstáculos terrestres y aéreos
4. ¡Supera tu récord personal!

[Ver documentación completa →](v3/README.md)

---

### V4: Escape del T-Rex - Edición Definitiva 🆕
**Tipo:** Endless runner completo con biomas, ranking y personalización

La versión más completa del juego con selector de biomas, sistema de ranking Top 5, y una experiencia visual mejorada para cada ambiente.

**Características principales:**
- 🌍 **3 Biomas seleccionables**: Nieve ❄️, Desierto 🏜️ y Selva 🌴
  - Cada bioma con paleta de colores única
  - Fondos parallax personalizados
  - Suelos y ambientes temáticos
- 🏆 **Sistema de Ranking Top 5**
  - Tabla permanente visible debajo del juego
  - Ingreso de nombre del jugador (máximo 15 caracteres)
  - Medallas para los primeros 3 lugares (🥇🥈🥉)
  - Persistencia en localStorage
- 🦅 **4 tipos de obstáculos**:
  - Rocas terrestres
  - Agujeros en el suelo
  - Cactus espinosos
  - Pterodáctilos voladores (3 alturas diferentes)
- 📊 **Indicador de peligro dinámico**:
  - SEGURO (verde) - T-Rex lejos
  - ALERTA (amarillo) - T-Rex acercándose
  - ¡PELIGRO! (rojo) - T-Rex muy cerca
- 🎨 **Efectos visuales mejorados**:
  - Fondo parallax de 3 capas
  - Volcanes con humo animado (bioma desierto)
  - Screen shake por colisión y proximidad
  - Animaciones de personajes detalladas
- 🎵 **Audio generativo dinámico**:
  - Música que se intensifica con el peligro
  - Efectos de sonido para salto, colisión y game over
- 💾 **Persistencia completa**:
  - Récord personal
  - Top 5 con nombres y distancias

**Cómo jugar:**
1. Abre `v4/escape-game.html` en tu navegador
2. Selecciona tu bioma favorito (Nieve, Desierto o Selva)
3. Presiona **¡CORRER!** para comenzar
4. Usa ↑ para saltar y ↓ para agacharte
5. Esquiva todos los obstáculos para acelerar
6. Al terminar, ingresa tu nombre para el ranking
7. ¡Compite por el primer lugar del Top 5!

[Ver documentación completa →](v4/README.md) | [Ver prompt de generación →](v4/PROMPT.md)

## 🚀 Inicio Rápido

No requiere instalación ni dependencias. Simplemente abre cualquiera de los archivos HTML en tu navegador:

```bash
# Versión 1 - Persecución clásica
Abre v1/index.html en tu navegador

# Versión 2 - Runner básico
Abre v2/escape-game.html en tu navegador

# Versión 3 - Runner con récords
Abre v3/escape-game.html en tu navegador

# Versión 4 - Edición definitiva (Recomendada) 🌟
Abre v4/escape-game.html en tu navegador
```

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas** - Renderizado de gráficos 2D
- **JavaScript ES6+** - Lógica del juego (vanilla, sin frameworks)
- **CSS3** - Estilos y animaciones
- **Web Audio API** - Audio generativo (v2, v3, v4)
- **localStorage** - Persistencia de datos (v3, v4)

## 📊 Comparación de Versiones

| Característica | V1 | V2 | V3 | V4 |
|----------------|----|----|----|----|
| Tipo de juego | Persecución libre | Endless runner | Endless runner | Endless runner |
| Control | Multidireccional | Salto/Agacharse | Salto/Agacharse | Salto/Agacharse |
| Velocidad | Constante | Dinámica | Dinámica | Dinámica |
| Obstáculos terrestres | No | 2 tipos | 3 tipos | 3 tipos |
| Obstáculos aéreos | No | No | Sí (pterodáctilos) | Sí (pterodáctilos) |
| Audio | No | Sí (generativo) | Sí (generativo) | Sí (generativo) |
| Efectos visuales | Básicos | Screen shake | Screen shake | Screen shake + Parallax |
| Biomas | No | No | No | Sí (3 opciones) |
| Récord personal | No | No | Sí | Sí |
| Ranking Top 5 | No | No | No | Sí |
| Nombres de jugadores | No | No | No | Sí |
| Persistencia de datos | No | No | Sí (récord) | Sí (récord + ranking) |
| Indicador de peligro | No | No | No | Sí (3 niveles) |
| Avance visual | No | No | Sí | Sí |

## 🎯 Requisitos del Sistema

- Navegador web moderno con soporte para:
  - HTML5 Canvas
  - JavaScript ES6+
  - Web Audio API (v2, v3, v4)
  - localStorage (v3, v4)
- JavaScript habilitado
- Resolución mínima recomendada: 1024x768

## 🎨 Evolución del Diseño

### V1: Concepto Original
- Juego de persecución simple con movimiento libre
- Enfoque en mecánicas básicas de IA

### V2: Transformación a Runner
- Cambio a formato endless runner
- Introducción de velocidad dinámica
- Sistema de audio generativo
- Efectos visuales de tensión

### V3: Expansión de Contenido
- Nuevos tipos de obstáculos (aéreos)
- Sistema de récords persistente
- Feedback visual mejorado

### V4: Experiencia Completa
- Personalización con biomas
- Sistema competitivo con ranking
- Interfaz pulida y profesional
- Experiencia visual rica y variada

## 🎓 Aprendizajes del Proyecto

Este proyecto demuestra:
- Desarrollo iterativo de videojuegos
- Programación orientada a objetos en JavaScript
- Uso de Canvas API para gráficos 2D
- Generación de audio procedural
- Gestión de estado del juego
- Persistencia de datos en el navegador
- Diseño de UI/UX para juegos
- Optimización de rendimiento en Canvas

## 📝 Documentación Adicional

- [README V1](v1/README.md) - Documentación de la versión de persecución
- [README V2](v2/README.md) - Documentación del runner básico
- [README V3](v3/README.md) - Documentación con récords
- [README V4](v4/README.md) - Documentación completa de la versión definitiva
- [PROMPT V4](v4/PROMPT.md) - Prompt completo para regenerar el juego V4

## 🔮 Posibles Mejoras Futuras

- Sistema de logros y desafíos diarios
- Más biomas (Cueva, Pantano, Volcán, Océano)
- Power-ups temporales (escudo, velocidad, salto doble)
- Modo historia con niveles progresivos
- Diferentes personajes jugables
- Más tipos de dinosaurios perseguidores
- Modo multijugador competitivo
- Leaderboards online globales
- Versión móvil con controles táctiles
- Modo oscuro/claro
- Personalización de personajes
- Música y efectos de sonido profesionales

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Mejorar el código existente
- Crear nuevas versiones del juego
- Añadir nuevos biomas
- Mejorar los gráficos y animaciones

## 📄 Licencia

Proyecto de código abierto para fines educativos y de entretenimiento.

---

**Desarrollado con ❤️ y mucha imaginación prehistórica** 🦴🦖

**¡Corre por tu vida y establece el récord más alto!** 🏃💨
