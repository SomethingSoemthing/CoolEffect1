const can = document.getElementById("canvas1");
const ctx = can.getContext("2d");
can.width = window.innerWidth;
can.height = window.innerHeight;
const pArray = [];
let hue = 0;




window.addEventListener("resize", function(){
  can.width = window.innerWidth;
  can.height = window.innerHeight;
})

const mouse = {
  x: null,
  y: null,
}

can.addEventListener("touchmove", function(event){
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;
  for (let i = 0; i < 2; i++){
    pArray.push(new Particle());
  }
})

can.addEventListener("touchstart", function(event) {
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;
  for (let i = 0; i < 10; i++) {
    pArray.push(new Particle());
  }
})

//not used
function drawCircle(){
  ctx.fillStyle = "White";
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 7, 0, Math.PI * 2);
  ctx.fill();
}

class Particle {
  constructor(){
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 7 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl("+ hue +", 100%, 50%";
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.1;
  }
  draw(){
    ctx.fillStyle = this.color
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles(){
  for (let i = 0; i < pArray.length; i++) {
    pArray[i].update();
    pArray[i].draw();
    if (document.getElementById("b3").checked){
      for (let j = i; j < pArray.length; j++){
        const dx = pArray[i].x - pArray[j].x;
        const dy = pArray[i].y - pArray[j].y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < 100 ){
          ctx.beginPath();
          ctx.strokeStyle = pArray[i].color;
          ctx.lineWidth = pArray[i].size/5;
          ctx.moveTo(pArray[i].x, pArray[i].y);
          ctx.lineTo(pArray[j].x, pArray[j].y);
          ctx.stroke();
        }
      }
    }
    if (pArray[i].size <= 0.3) {
      pArray.splice(i, 1)
      i--;
    }
  }
}

function animate(){
  //ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  //ctx.fillRect(0, 0, can.width, can.height);
  ctx.clearRect(0, 0, can.width, can.height);
  handleParticles();
  drawCircle();
  
  if (document.getElementById("b").checked){
    hue += 3;
  }
  else {
    hue = 0;
  }
  
  
  requestAnimationFrame(animate);
}
animate();