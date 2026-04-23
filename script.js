// Scroll suave
function scrollToSection(id){
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// Animación scroll
const projects = document.querySelectorAll(".project");

window.addEventListener("scroll", () => {
    projects.forEach(el => {
        const pos = el.getBoundingClientRect().top;

        if(pos < window.innerHeight - 100){
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
});
const cursor = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
const image = document.querySelector(".image-wrapper");

document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;

    image.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
const track = document.querySelector('.carousel-track');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let isMoving = false;

//  ACTUALIZA EL CENTRO
function updateCenter() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => card.classList.remove('active'));

    const middle = Math.floor(cards.length / 2);
    if (cards[middle]) {
        cards[middle].classList.add('active');
    }
}

updateCenter();

//  MOVER A LA DERECHA
next.addEventListener('click', () => {
    if (isMoving) return;
    isMoving = true;

    const first = track.firstElementChild;

    track.style.transition = "0.6s";
    track.style.transform = "translateX(-320px)";

    setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        track.appendChild(first);

        updateCenter();
        isMoving = false;
    }, 600);
});

//  MOVER A LA IZQUIERDA
prev.addEventListener('click', () => {
    if (isMoving) return;
    isMoving = true;

    const last = track.lastElementChild;

    track.insertBefore(last, track.firstElementChild);
    track.style.transition = "none";
    track.style.transform = "translateX(-320px)";

    requestAnimationFrame(() => {
        track.style.transition = "0.6s";
        track.style.transform = "translateX(0)";
    });

    setTimeout(() => {
        updateCenter();
        isMoving = false;
    }, 600);
});

//  AUTO LOOP

const lines = document.querySelectorAll('.line');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            lines.forEach(line => {
                line.classList.remove('active');
                void line.offsetWidth; // reset
                line.classList.add('active');
            });
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.puesto').forEach(el => observer.observe(el));
// 1. Definimos un solo observador para el contenedor "About"
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

    }
    else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

const aboutSection = document.querySelector('.about-container');
if (aboutSection) aboutObserver.observe(aboutSection);


// 2. Definimos otro observador para los "puestos" (las líneas)
// Usamos un nombre diferente para evitar el error de "Identifier 'observer' has already been declared"
const linesObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Si tienes varias líneas, esto las reinicia todas
      const lines = document.querySelectorAll('.linea'); // Asegúrate que esta clase sea la correcta
      lines.forEach(line => {
        line.classList.remove('active');
        void line.offsetWidth; // truco para reiniciar la animación de CSS
        line.classList.add('active');
      });
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.puesto').forEach(el => linesObserver.observe(el));
window.addEventListener('DOMContentLoaded', () => {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando entra en pantalla: añadimos la clase
                entry.target.classList.add('visible');
            } else {
                // Cuando sale de pantalla: la quitamos
                // Esto permite que al volver a subir/bajar se repita
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Un umbral más bajo para que detecte el cambio rápido

    document.querySelectorAll('.hero-desc').forEach(el => heroObserver.observe(el));
});
const contactSection = document.querySelector('#contacto');
const players = document.querySelectorAll('#contacto dotlottie-player');

const syncObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Agregamos la clase para el efecto CSS de arriba
            contactSection.classList.add('visible');
            
            // Forzamos a todos los reproductores a iniciar desde el frame 0
            players.forEach(player => {
                player.seek(0); 
                player.play();
            });
        } else {
            // Opcional: pausarlos cuando no se ven para ahorrar recursos
            contactSection.classList.remove('visible');
            players.forEach(player => player.pause());
        }
    });
}, { threshold: 0.3 });

if(contactSection) syncObserver.observe(contactSection);
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('#contacto');
    const players = document.querySelectorAll('#contacto dotlottie-player');

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Activamos la visibilidad (CSS)
                contactSection.classList.add('visible');

                // 2. Sincronizamos el arranque
                players.forEach(player => {
                    player.stop(); // Los lleva al inicio (frame 0)
                    player.play(); // Inician todos juntos
                });
            } else {
                // Opcional: pausar al salir para ahorrar recursos
                contactSection.classList.remove('visible');
                players.forEach(player => player.stop());
            }
        });
    }, { threshold: 0.3 }); // Se activa cuando se ve el 30% de la sección

    if (contactSection) contactObserver.observe(contactSection);
});
// 1. Variable de control de pausa
let isPaused = false;

// 2. Seleccionamos el contenedor del carrusel para detectar el mouse
const carouselContainer = document.querySelector('.carousel');

carouselContainer.addEventListener('mouseenter', () => {
    isPaused = true;
    console.log("Carrusel pausado"); // Solo para que confirmes en consola
});

carouselContainer.addEventListener('mouseleave', () => {
    isPaused = false;
    console.log("Carrusel reanudado");
});

// 3. UN SOLO INTERVALO que controla todo el movimiento automático
setInterval(() => {
    // SOLO si isPaused es falso (el mouse NO está encima), hacemos clic en 'next'
    if (!isPaused) {
        next.click();
    }
}, 3500);