const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};
canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 3; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("touchmove",function (event) {
    event.preventDefault(); // Prevents scrolling
    const touch = event.touches[0];
    if (touch) {
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      for (let i = 0; i < 3; i++) {
        particlesArray.push(new Particle());
      }
    }
  },
  { passive: false }
); // Needed to allow preventDefault on touch events

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.03; //decrease the size of the circle
  }
  draw() {
    ctx.fillStyle = "white";
    //ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    //ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x; //distance between the two particles
      const dy = particlesArray[i].y - particlesArray[j].y; //distance between the two particles
      const distance = Math.sqrt(dx * dx + dy * dy); //distance between the two particles
      if (distance < 50) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color; //sets the color of the line to the color of the particle
        //ctx.lineWidth = particlesArray[i].size / 10; //sets the width of the line to the size of the particle
        ctx.lineWidth = 0.5; //sets the width of the line to 0.2
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y); //moves the line to the first particle
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y); //draws a line to the second particle
        ctx.stroke(); //draws the line
        ctx.closePath(); //closes the path
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1); //removes the particle from the array when it is smaller than 0.3
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the canvas
  //ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; //creates a fading effect
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue = hue + 0.2;
  requestAnimationFrame(animate); //created a loop to clear the canvas and draw the circle again
}
animate();
