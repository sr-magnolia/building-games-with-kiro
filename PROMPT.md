Ayúdame a construir 'Escape del T-Rex', un juego web de supervivencia frenética en 2D que destile una atmósfera de arcade retro de los 90. Quiero que el código sea modular JS, HTML y CSS, pero con un acabado que se sienta 'jugoso' (juicy) y profesional.

1. El Core: "La Huida Frenética"
El jugador es un cavernícola atrapado en un endless runner lateral. No solo corre; huye por su vida.

Velocidad Dinámica: No quiero una velocidad fija. Si el jugador esquiva obstáculos con fluidez, la velocidad debe subir , dándole  sensación de adrenalina. Si choca, la pérdida de inercia debe ser castigada (mínimo 3), haciendo que el T-Rex se le eche encima.

Posicionamiento Elástico: El jugador debe moverse en el eje X. Si lo hace bien, se aleja del borde izquierdo. Si falla, el dinosaurio lo arrincona.

2. El Mundo: "Biomas con Alma"
Antes de empezar, quiero un selector de biomas que cambie el alma del juego. No solo son colores, es la atmósfera:

Nieve: Tonos gélidos y limpios.

Desierto: Mi favorito. Quiero volcanes con humo animado de fondo y un calor que se sienta en los colores.

Selva: Densidad de verdes y una vibra de peligro acechante.

Implementa esto con un sistema de Parallax de 3 capas para que el fondo tenga profundidad real.

3. El T-Rex y el Peligro
El T-Rex no es un sprite estático; es una amenaza constante en la izquierda.

Feedback Visual: Implementa un 'Indicador de Peligro' que pulse en rojo cuando el T-Rex esté cerca.

Screen Shake: Cuanto más cerca esté el dinosaurio, más debe temblar la pantalla por sus pisadas. Esto es vital para el 'Vibe'.

Enemigos: Añade rocas, cactus y agujeros, pero sobre todo Pterodáctilos que vuelen a diferentes alturas con un aleteo ondulante y rápido.

4. Competitividad y Pulido
Ranking: Quiero un Top 5 persistente (localStorage) con medallas de oro, plata y bronce. Que el jugador sienta que su récord importa.

Audio Dinámico: La música debe estresarse (subir frecuencia e intensidad) a medida que el dinosaurio se acerca.

Estética: Todo en Pixel Art retro
