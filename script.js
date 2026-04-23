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


const linesObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lines = document.querySelectorAll('.linea'); 
      lines.forEach(line => {
        line.classList.remove('active');
        void line.offsetWidth; 
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
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); 

    document.querySelectorAll('.hero-desc').forEach(el => heroObserver.observe(el));
});
const contactSection = document.querySelector('#contacto');
const players = document.querySelectorAll('#contacto dotlottie-player');

const syncObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            contactSection.classList.add('visible');
            
            
            players.forEach(player => {
                player.seek(0); 
                player.play();
            });
        } else {
            
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
                contactSection.classList.add('visible');

                
                players.forEach(player => {
                    player.stop(); 
                    player.play(); 
                });
            } else {
                
                contactSection.classList.remove('visible');
                players.forEach(player => player.stop());
            }
        });
    }, { threshold: 0.3 }); 

    if (contactSection) contactObserver.observe(contactSection);
});

let isPaused = false;


const carouselContainer = document.querySelector('.carousel');

carouselContainer.addEventListener('mouseenter', () => {
    isPaused = true;
    console.log("Carrusel pausado"); 
});

carouselContainer.addEventListener('mouseleave', () => {
    isPaused = false;
    console.log("Carrusel reanudado");
});

setInterval(() => {
  
    if (!isPaused) {
        next.click();
    }
}, 3500);
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
const elements = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-delay'
);

window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
});
