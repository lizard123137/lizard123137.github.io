const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.height = canvas.height = window.innerHeight;
canvas.width = document.body.clientWidth;

let particles = []
let hue = 0;

const maxSize = 4;
const maxSpeed = 2;
const shrinkRate = 0.02;

const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("resize", function(event) {
    canvas.height = window.innerHeight;
    canvas.width = document.body.clientWidth;
});

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 3; i++) {
        particles.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * maxSize + 0.1;
        this.speedX = Math.random() * maxSpeed - 1;
        this.speedY = Math.random() * maxSpeed - 1;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > 0.1) {
            this.size -= shrinkRate;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI);
        ctx.fill();
    }
}

function handleParticles() {
    for(p of particles) {
        p.update();
        p.draw();
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleParticles();
    hue++;

    if(particles.length > 0 && (particles[0].size == 0.0 || particles[0].x < 0 || particles[0].x > canvas.width || particles[0].y < 0 || particles[0].y > canvas.height)) {
        particles.shift();
    }

    requestAnimationFrame(animate);
}

animate();