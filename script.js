// Mensajes románticos (muchos más)
const romanticMessages = [
    "Hola mi amor 💖",
    "Eres la estrella más brillante de mi universo ⭐",
    "Cada día contigo es un regalo del cielo ✨",
    "Tu sonrisa ilumina mi mundo entero 😊",
    "Eres mi razón de ser y mi mayor felicidad 💕",
    "Contigo, cada momento es mágico 🌟",
    "Tu amor es mi fuerza y mi inspiración 💪",
    "Eres mi sueño hecho realidad 💭",
    "Cada latido de mi corazón es por ti 💓",
    "Eres mi todo, mi vida, mi amor eterno ♾️",
    "Contigo quiero envejecer y reírnos juntos 👫",
    "Tu amor es el sol que ilumina mis días ☀️",
    "Eres mi refugio seguro en este mundo 🌍",
    "Cada día te amo más que ayer 💖",
    "Eres mi persona favorita en todo el universo 🌌",
    "Tu risa es la música más hermosa que conozco 🎵",
    "En tus ojos veo el futuro que quiero vivir 👀",
    "Tu abrazo es mi lugar favorito del mundo 🤗",
    "Eres mi inspiración para ser mejor cada día 🌱",
    "Contigo, hasta los días grises se ven coloridos 🌈",
    "Tu amor me hace sentir que puedo conquistar el mundo 🌍",
    "Eres mi compañera de aventuras y mi mejor amiga 👭",
    "Tu presencia hace que todo tenga sentido ✨",
    "Eres mi estrella polar en la oscuridad 🌟",
    "Contigo, cada día es una nueva aventura 🚀",
    "Tu amor es el combustible de mi alma ⛽",
    "Eres mi razón para sonreír todos los días 😊",
    "Contigo, el tiempo se detiene y solo existimos nosotros ⏰",
    "Tu amor es mi mayor tesoro 💎",
    "Eres mi hogar, mi paz, mi todo 🏠",
    "Contigo, cada momento es perfecto 🎯",
    "Tu amor es la luz que guía mi camino 💡",
    "Eres mi mejor decisión de vida ✅",
    "Contigo, hasta los problemas se ven pequeños 🔍",
    "Tu amor es mi superpoder 💪",
    "Eres mi razón para creer en los milagros ✨",
    "Contigo, cada día es una celebración 🎉",
    "Tu amor es mi mayor victoria 🏆",
    "Eres mi inspiración para todos mis sueños 💭",
    "Contigo, hasta la lluvia es hermosa 🌧️",
    "Tu amor es mi mayor fortuna 💰",
    "Eres mi razón para ser feliz cada día 😄",
    "Contigo, cada día es un regalo 🎁",
    "Tu amor es mi mayor bendición 🙏",
    "Eres mi razón para creer en el amor eterno ♾️"
];

// Variables globales
let currentMessageIndex = 0;
let isAutoPlaying = false;
let autoPlayInterval;
let starGameActive = false;
let memoryGameActive = false;
let score = 0;
let memoryCards = [];
let flippedCards = [];
let matches = 0;

// Elementos del DOM
const starsCanvas = document.getElementById('starsCanvas');
const messageDisplay = document.getElementById('currentMessage');
const nextMessageBtn = document.getElementById('nextMessage');
const autoPlayBtn = document.getElementById('autoPlay');
const pausePlayBtn = document.getElementById('pausePlay');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeStarsCanvas();
    initializeGames();
    initializeMessages();
    createParticles();
    startStarAnimation();
});

// Canvas de estrellas fugaces
function initializeStarsCanvas() {
    const ctx = starsCanvas.getContext('2d');
    const canvas = starsCanvas;
    
    // Ajustar tamaño del canvas
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Partículas de estrellas
    const particles = [];
    const maxParticles = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.life = Math.random() * 100 + 50;
            this.maxLife = this.life;
            this.size = Math.random() * 3 + 1;
            this.color = `hsl(${Math.random() * 60 + 40}, 70%, 60%)`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            // Rebote en los bordes
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life / this.maxLife;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Crear partículas
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
    
    // Función de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar partículas
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            
            if (particle.life <= 0) {
                particles[index] = new Particle();
            }
        });
        
        // Dibujar mensaje actual
        drawMessage(ctx);
        
        requestAnimationFrame(animate);
    }
    
    function drawMessage(ctx) {
        const message = romanticMessages[currentMessageIndex];
        ctx.save();
        ctx.font = 'bold 24px Dancing Script, cursive';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Sombra del texto
        ctx.shadowColor = 'rgba(255, 107, 107, 0.5)';
        ctx.shadowBlur = 10;
        
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }
    
    animate();
}

// Inicializar juegos
function initializeGames() {
    // Juego de captura de estrellas
    document.getElementById('startStarGame').addEventListener('click', startStarGame);
    
    // Juego de memoria
    document.getElementById('startMemoryGame').addEventListener('click', startMemoryGame);
    
    // Área de dibujo
    initializeDrawingCanvas();
}

// Juego de captura de estrellas
function startStarGame() {
    starGameActive = true;
    score = 0;
    document.getElementById('score').textContent = score;
    
    const starsContainer = document.getElementById('starsContainer');
    starsContainer.innerHTML = '';
    
    // Crear estrellas cayendo
    const createStar = () => {
        if (!starGameActive) return;
        
        const star = document.createElement('div');
        star.className = 'falling-star';
        star.style.left = Math.random() * (starsContainer.offsetWidth - 20) + 'px';
        
        star.addEventListener('click', () => {
            score += 10;
            document.getElementById('score').textContent = score;
            star.remove();
            createHeartEffect(star);
        });
        
        starsContainer.appendChild(star);
        
        // Remover estrella después de caer
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, 3000);
    };
    
    // Crear estrellas cada 800ms
    const starInterval = setInterval(createStar, 800);
    
    // Detener juego después de 30 segundos
    setTimeout(() => {
        starGameActive = false;
        clearInterval(starInterval);
        alert(`¡Juego terminado! Puntuación: ${score} puntos 💖`);
    }, 30000);
}

// Efecto de corazón
function createHeartEffect(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'heart-effect';
    heart.style.left = element.offsetLeft + 'px';
    heart.style.top = element.offsetTop + 'px';
    
    document.getElementById('starCatchGame').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Preguntas de música favoritas
const musicQuestions = [
    {
        question: "¿Cuál es mi artista favorito de rap?",
        options: ["Canserbero", "Bad Bunny", "J Balvin", "Maluma"],
        correct: 0,
        artist: "Canserbero"
    },
    {
        question: "¿Qué banda uruguaya me encanta?",
        options: ["Los Auténticos Decadentes", "Cuarteto de Nos", "Calle 13", "Maná"],
        correct: 1,
        artist: "Cuarteto de Nos"
    },
    {
        question: "¿Qué tipo de música cristiana prefiero?",
        options: ["Alabanza", "Adoración", "Gospel", "Todas las anteriores"],
        correct: 3,
        artist: "Música Cristiana"
    },
    {
        question: "¿Cuál es mi canción favorita de Canserbero?",
        options: ["Jeremías 17:5", "Es Épico", "Pesadilla", "No sé"],
        correct: 0,
        artist: "Canserbero"
    },
    {
        question: "¿Qué álbum de Cuarteto de Nos me gusta más?",
        options: ["Raro", "Bipolar", "Porfiado", "Todos"],
        correct: 3,
        artist: "Cuarteto de Nos"
    }
];

// Juego de memoria con preguntas de música
function startMemoryGame() {
    memoryGameActive = true;
    matches = 0;
    flippedCards = [];
    
    const memoryGrid = document.getElementById('memoryGrid');
    memoryGrid.innerHTML = '';
    
    // Mostrar pregunta de música
    const questionIndex = Math.floor(Math.random() * musicQuestions.length);
    const question = musicQuestions[questionIndex];
    
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    questionCard.innerHTML = `
        <h4>${question.question}</h4>
        <div class="options-container">
            ${question.options.map((option, index) => 
                `<button class="option-btn" data-index="${index}">${option}</button>`
            ).join('')}
        </div>
    `;
    
    memoryGrid.appendChild(questionCard);
    
    // Agregar estilos para las opciones
    const style = document.createElement('style');
    style.textContent = `
        .question-card {
            grid-column: 1 / -1;
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            margin-bottom: 20px;
        }
        .question-card h4 {
            color: #ffd93d;
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
        .options-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        .option-btn {
            padding: 10px 15px;
            border: none;
            border-radius: 10px;
            background: linear-gradient(45deg, #4d9de0, #6bb6ff);
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        .option-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(77, 157, 224, 0.4);
        }
        .option-btn.correct {
            background: linear-gradient(45deg, #6bcf7f, #4d9de0);
        }
        .option-btn.wrong {
            background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
        }
    `;
    document.head.appendChild(style);
    
    // Agregar event listeners a las opciones
    questionCard.querySelectorAll('.option-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index === question.correct) {
                btn.classList.add('correct');
                btn.textContent += ' ✅';
                setTimeout(() => {
                    alert(`¡Correcto! Te gusta ${question.artist} 🎵`);
                    memoryGameActive = false;
                }, 1000);
            } else {
                btn.classList.add('wrong');
                btn.textContent += ' ❌';
                setTimeout(() => {
                    alert(`Incorrecto. La respuesta correcta era: ${question.options[question.correct]} 😊`);
                    memoryGameActive = false;
                }, 1000);
            }
        });
    });
}

function flipCard(card) {
    card.classList.add('flipped');
    card.innerHTML = card.dataset.symbol;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matches++;
        if (matches === memoryCards.length / 2) {
            setTimeout(() => {
                alert('¡Felicitaciones! Has completado el juego de memoria 💖');
                memoryGameActive = false;
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '?';
        card2.innerHTML = '?';
    }
    
    flippedCards = [];
}

// Función para crear animación de corazón
function createHeartAnimation() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '3rem';
    heart.style.zIndex = '10000';
    heart.style.animation = 'heartPulse 2s ease-in-out infinite';
    heart.style.pointerEvents = 'none';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Área de dibujo mejorada para corazones
function initializeDrawingCanvas() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    // Configurar canvas
    ctx.strokeStyle = '#ff6b6b';
    ctx.fillStyle = '#ff6b6b';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Eventos de dibujo
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Eventos táctiles para móviles
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        startDrawing({ offsetX: x, offsetY: y });
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        draw({ offsetX: x, offsetY: y });
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });
    
    function startDrawing(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Función para dibujar corazón automáticamente
    function drawHeart(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size, size);
        
        ctx.beginPath();
        ctx.moveTo(0, 0.3);
        ctx.bezierCurveTo(-0.3, 0, -0.3, -0.3, 0, -0.3);
        ctx.bezierCurveTo(0.3, -0.3, 0.3, 0, 0, 0.3);
        ctx.bezierCurveTo(0, 0.6, -0.3, 0.6, -0.3, 0.3);
        ctx.bezierCurveTo(-0.3, 0, 0, 0, 0, 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    
    // Botón para dibujar corazón automático
    const drawHeartBtn = document.createElement('button');
    drawHeartBtn.textContent = 'Dibujar Corazón 💖';
    drawHeartBtn.className = 'btn btn-small';
    drawHeartBtn.style.margin = '5px';
    drawHeartBtn.addEventListener('click', () => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        drawHeart(centerX, centerY, 30);
    });
    
    document.querySelector('.drawing-controls').appendChild(drawHeartBtn);
    
    // Botones de control
    document.getElementById('clearCanvas').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    document.getElementById('saveDrawing').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'mi-corazon-para-ti.png';
        link.href = dataURL;
        link.click();
        
        // Mostrar mensaje de confirmación
        const message = document.createElement('div');
        message.textContent = '¡Corazón guardado con amor! 💖';
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.right = '20px';
        message.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '25px';
        message.style.fontWeight = 'bold';
        message.style.zIndex = '10000';
        message.style.animation = 'slideIn 0.5s ease-out';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.5s ease-out forwards';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    });
}

// Función de galería removida - ya no se necesita

// Mensajes especiales para el corazón
function initializeMessages() {
    const messagesGrid = document.getElementById('messagesGrid');
    const heartMessages = [
        { 
            title: "Para Mi Corazón 💖", 
            content: "Eres el latido que da sentido a mi existencia, la melodía que hace que mi corazón cante con alegría cada día." 
        },
        { 
            title: "Mi Promesa de Amor 💕", 
            content: "Prometo cuidar tu corazón como el tesoro más preciado, protegerlo, amarlo y hacerlo feliz todos los días de mi vida." 
        },
        { 
            title: "Nuestro Amor Eterno ♾️", 
            content: "Quiero que sepas que mi amor por ti es infinito, sin condiciones, sin límites. Eres mi todo, mi razón de ser." 
        },
        { 
            title: "Gracias por Existir 🙏", 
            content: "Gracias por llenar mi vida de amor, por ser mi compañera, mi mejor amiga, mi inspiración y mi mayor felicidad." 
        },
        { 
            title: "Mi Futuro Contigo 🌟", 
            content: "Contigo quiero construir todos mis sueños, crecer juntos, reírnos juntos, envejecer juntos y amarnos por siempre." 
        },
        { 
            title: "Eres Mi Hogar 🏠", 
            content: "En tu corazón encontré mi hogar, mi refugio seguro, mi lugar favorito del mundo donde siempre quiero estar." 
        }
    ];
    
    heartMessages.forEach(message => {
        const card = document.createElement('div');
        card.className = 'message-card';
        card.innerHTML = `
            <h4 style="color: #ff6b6b; margin-bottom: 15px; font-family: 'Dancing Script', cursive; font-size: 1.4rem;">${message.title}</h4>
            <p style="color: rgba(255, 255, 255, 0.9); line-height: 1.6; font-size: 1rem;">${message.content}</p>
        `;
        messagesGrid.appendChild(card);
    });
}

// Controles de mensajes
nextMessageBtn.addEventListener('click', () => {
    currentMessageIndex = (currentMessageIndex + 1) % romanticMessages.length;
    messageDisplay.textContent = romanticMessages[currentMessageIndex];
    messageDisplay.classList.add('fade-in');
    setTimeout(() => messageDisplay.classList.remove('fade-in'), 1000);
});

autoPlayBtn.addEventListener('click', () => {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        autoPlayBtn.textContent = 'Detener Auto Play ⏹️';
        autoPlayBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
        
        // Crear animación de corazón
        createHeartAnimation();
        
        autoPlayInterval = setInterval(() => {
            currentMessageIndex = (currentMessageIndex + 1) % romanticMessages.length;
            messageDisplay.textContent = romanticMessages[currentMessageIndex];
            messageDisplay.classList.add('fade-in');
            setTimeout(() => messageDisplay.classList.remove('fade-in'), 1000);
        }, 3000);
    } else {
        isAutoPlaying = false;
        clearInterval(autoPlayInterval);
        autoPlayBtn.textContent = 'Auto Play ✨';
        autoPlayBtn.style.background = 'linear-gradient(45deg, #4d9de0, #6bb6ff)';
    }
});

pausePlayBtn.addEventListener('click', () => {
    if (isAutoPlaying) {
        isAutoPlaying = false;
        clearInterval(autoPlayInterval);
        autoPlayBtn.textContent = 'Auto Play ✨';
    }
});

// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }, 200);
}

// Animación de estrellas de fondo
function startStarAnimation() {
    const starsBackground = document.getElementById('stars-background');
    
    setInterval(() => {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = '#ffd93d';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = '100vh';
        star.style.boxShadow = '0 0 6px #ffd93d';
        star.style.animation = 'fallingStar 3s linear forwards';
        
        starsBackground.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 3000);
    }, 500);
}

// CSS para estrellas cayendo
const style = document.createElement('style');
style.textContent = `
    @keyframes fallingStar {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efectos especiales al hacer clic
document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
        createClickEffect(e.clientX, e.clientY);
    }
});

function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    effect.style.width = '20px';
    effect.style.height = '20px';
    effect.style.background = 'radial-gradient(circle, #ffd93d, transparent)';
    effect.style.borderRadius = '50%';
    effect.style.pointerEvents = 'none';
    effect.style.animation = 'clickEffect 0.6s ease-out forwards';
    effect.style.zIndex = '1000';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 600);
}

// CSS para efecto de clic
const clickStyle = document.createElement('style');
clickStyle.textContent = `
    @keyframes clickEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickStyle);

// Mensaje de bienvenida
setTimeout(() => {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.style.position = 'fixed';
    welcomeMessage.style.top = '50%';
    welcomeMessage.style.left = '50%';
    welcomeMessage.style.transform = 'translate(-50%, -50%)';
    welcomeMessage.style.background = 'rgba(0, 0, 0, 0.9)';
    welcomeMessage.style.color = '#ff6b6b';
    welcomeMessage.style.padding = '30px';
    welcomeMessage.style.borderRadius = '20px';
    welcomeMessage.style.fontSize = '1.5rem';
    welcomeMessage.style.fontFamily = 'Dancing Script, cursive';
    welcomeMessage.style.textAlign = 'center';
    welcomeMessage.style.zIndex = '10000';
    welcomeMessage.style.border = '2px solid #ff6b6b';
    welcomeMessage.innerHTML = '¡Bienvenida a tu universo de amor! 💖<br><small style="font-size: 1rem; margin-top: 10px; display: block;">Hecho con todo mi cariño para ti</small>';
    
    document.body.appendChild(welcomeMessage);
    
    setTimeout(() => {
        welcomeMessage.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => welcomeMessage.remove(), 1000);
    }, 3000);
}, 1000);

// CSS para mensaje de bienvenida y animaciones
const welcomeStyle = document.createElement('style');
welcomeStyle.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes heartPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    
    @keyframes slideIn {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(welcomeStyle);
