# 🦴 Dino Chase - Vibecoding Game

Un juego de huida frenética donde un cavernícola corre por su vida mientras un dinosaurio aterrador lo persigue implacablemente.

## Prompt utilizado para generar el juego
```
Ayúdame a crear la base para un juego de Vibecoding. La premisa es: un dinosaurio pixel-art grande y aterrador persigue implacablemente a un cavernícola que corre automáticamente hacia la derecha.

La Dinámica: El juego debe sentirse como una huida frenética. Si el cavernícola salta y supera con éxito obstáculos (como agujeros en el suelo o rocas), quiero que el cavernícola acelere ligeramente, alejándose del dinosaurio. Si el cavernícola choca con un obstáculo pero no muere, la persecución debe sentirse más estrecha.

El Vibe: Cuando el dinosaurio se acerque mucho, la música debe volverse más intensa y quiero un efecto de 'screen shake' (temblor de pantalla) para simular sus pisadas. Si el dinosaurio alcanza al cavernícola, el juego termina con una animación de 'Game Over' dramática pero cómica
```  

> Credits used: 0.93 Elapsed time: 1m 10s

## 🎮 Cómo Jugar

1. Abre `escape-game.html` en tu navegador
2. Presiona cualquier tecla para comenzar
3. Usa  **FLECHA ARRIBA** para saltar
4. Evita obstáculos (rocas y agujeros)
5. ¡Sobrevive el mayor tiempo posible!

## 🎯 Mecánicas del Juego

### Sistema de Velocidad Dinámica
- **Saltos exitosos**: El cavernícola acelera ligeramente, alejándose del dinosaurio
- **Colisiones con obstáculos**: La velocidad disminuye, haciendo que el dinosaurio se acerque más

### Efectos de Tensión
- **Screen Shake**: Cuando el dinosaurio está cerca (<150px), la pantalla tiembla simulando sus pisadas
- **Música Dinámica**: La intensidad y frecuencia de la música aumentan cuando el peligro se acerca
- **Persecución Adaptativa**: El dinosaurio acelera gradualmente con el tiempo

### Obstáculos
- **Rocas**: Obstáculos sólidos que debes saltar
- **Agujeros**: Huecos en el suelo que requieren timing preciso

## 🎨 Características Visuales

- Arte pixel-art retro para cavernícola y dinosaurio
- Animaciones de correr y pisadas
- Efectos visuales de pánico (ojos del cavernícola, dientes del dinosaurio)
- Fondo con nubes en movimiento

## 🎵 Audio

- Sistema de audio generativo usando Web Audio API
- Música que se intensifica según la proximidad del dinosaurio
- Sin archivos externos necesarios

## 🚀 Próximas Mejoras Posibles

- Más tipos de obstáculos
- Power-ups temporales
- Sistema de puntuación y récords
- Diferentes biomas/escenarios
- Más animaciones de Game Over

---

**Vibecoding**: Código minimalista, máxima diversión 🎮
