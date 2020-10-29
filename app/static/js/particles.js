const canvas = document.getElementById(`canvas1`);
const ctx = canvas.getContext(`2d`);
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray;

// create constructor function
function Particle(x, y, dirX, dirY, size, color){
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = color;
}


//add draw method to particle prototype
Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
};

//add update method to Particle
Particle.prototype.update = function() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0){
        this.dirX = -this.dirX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0){
        this.dirY = -this.dirY;
    }
    this.x += this.dirX;
    this.y += this.dirY;
    this.draw();
};

// create particle array
function init(){

    particleArray = [];

    for(let i = 0; i < 100; i++){
        let size = Math.random() * 40;
        let x = Math.random() * (canvas.width - 2*size);
        let y = Math.random() * (canvas.height - 2*size);
        let dirX = Math.random() * .4 - .2;
        let dirY = Math.random() * .4 - .2;

        let red = Math.random() * 255;
        let blue = Math.random() * 255;
        let green = Math.random() * 255;
        let color = `rgb(${red},${green},${blue})`;

        particleArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

// create animation loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for (let i = 0; i<particleArray.length; i++){
        particleArray[i].update();
    }
}
init();
animate();

window.addEventListener(`resize`, function(){
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    init();
}
);
