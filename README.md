# 🦖 Dino Chase - Colección de Juegos Prehistóricos

Una colección de juegos de persecución con temática prehistórica desarrollados con HTML5, CSS3 y JavaScript vanilla. Dos versiones diferentes del mismo concepto: sobrevivir a un dinosaurio hambriento.

## 📁 Estructura del Proyecto

```
├── v1/                    # Versión 1: Juego de persecución clásico
│   ├── index.html
│   ├── game.js
│   └── README.md
│
├── v2/                    # Versión 2: Juego de huida tipo runner
│   ├── escape-game.html
│   ├── escape-game.js
│   ├── escape-style.css
│   └── README.md
│
└── v3/                    # Versión 3: Runner mejorado con biomas y récords
    ├── escape-game.html
    ├── escape-game.js
    ├── escape-style.css
    └── README.md
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

### V3: Escape del T-Rex - Edición Mejorada 🆕
**Tipo:** Endless runner con biomas, récords y obstáculos aéreos

La versión definitiva del juego de escape con nuevas características emocionantes: dinosaurios voladores, sistema de récords con nombres de jugadores, y tres biomas diferentes para elegir.

**Características:**
- 🦅 **Dinosaurios voladores** a diferentes alturas (bajos y altos)
- 🏆 **Sistema de récords** con top 10 de mejores puntuaciones
- 🌍 **3 Biomas jugables**: Prehistórico, Selva y Desierto
- 👤 **Nombres de jugadores** guardados con cada récord
- 🎨 **Paletas de colores** únicas para cada bioma
- 📊 **Persistencia de datos** con LocalStorage
- Todas las características de V2 (velocidad dinámica, música, efectos)

**Cómo jugar:**
1. Abre `v3/escape-game.html` en tu navegador
2. Usa ↑ para saltar y ↓ para agacharte
3. Esquiva obstáculos terrestres y aéreos
4. ¡Establece un nuevo récord!

[Ver documentación completa →](v3/README.md)

## 🚀 Inicio Rápido

No requiere instalación ni dependencias. Simplemente abre cualquiera de los archivos HTML en tu navegador:

```bash
# Versión 1
Abre v1/index.html en tu navegador

# Versión 2
Abre v2/escape-game.html en tu navegador

# Versión 3 (Recomendada)
Abre v3/escape-game.html en tu navegador
```

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas** - Renderizado de gráficos
- **JavaScript ES6** - Lógica del juego
- **CSS3** - Estilos y animaciones
- **Web Audio API** - Audio generativo (v2)

## 📊 Comparación de Versiones

| Característica | V1 | V2 | V3 |
|----------------|----|----|-----|
| Tipo de juego | Persecución libre | Endless runner | Endless runner |
| Control | Multidireccional | Salto/Agacharse | Salto/Agacharse |
| Velocidad | Constante | Dinámica | Dinámica |
| Obstáculos | No | Sí (terrestres) | Sí (terrestres + aéreos) |
| Audio | No | Sí (generativo) | Sí (generativo) |
| Efectos visuales | Básicos | Screen shake | Screen shake |
| Dificultad | Estática | Progresiva | Progresiva |
| Sistema de récords | No | No | Sí (top 10) |
| Persistencia de datos | No | No | Sí (LocalStorage) |

## 🎯 Requisitos

- Navegador web moderno con soporte para:
  - HTML5 Canvas
  - JavaScript ES6
  - Web Audio API (solo v2)
- JavaScript habilitado

## 🎨 Concepto de Diseño

Las tres versiones comparten la temática prehistórica pero ofrecen experiencias de juego diferentes:

- **V1** se enfoca en la estrategia y el control preciso
- **V2** se enfoca en los reflejos y la tensión creciente
- **V3** añade variedad visual, competitividad y rejugabilidad con  récords

## 🔮 Posibles Mejoras Futuras

- Sistema de logros y desafíos
- Más tipos de dinosaurios y criaturas prehistóricas
- Power-ups y habilidades especiales
- Modo multijugador competitivo
- Leaderboards online globales
- Versión móvil con controles táctiles
- Más biomas (nieve, pantano, cueva)
- Modo historia con niveles progresivos

## 📝 Licencia

Proyecto de código abierto para fines educativos y de entretenimiento.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Mejorar el código existente
- Crear nuevas versiones del juego

---

**Desarrollado con ❤️ y mucha imaginación prehistórica** 🦴
