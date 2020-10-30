let game = document.getElementById(`game-board`);
let size = 20;
let color = `grey`;
let startX = 10;
let startY = 10;
let snakeBody = [];

function bodyPart(posX, posY) {
    this.body = document.createElement(`div`);
    this.pos = [posX, posY];

    this.body.setAttribute(`style`,  `width: ` + size + `px; height: ` + size + `px;`);
    this.body.style.width = size + `px;`;
    this.body.style.height = size + `px;`;
    this.body.style.backgroundColor = color;
    this.body.style.position = `relative`;
    this.body.style.zIndex = 10;
    this.body.style.left = this.pos[0] + `px`;
    this.body.style.top = this.pos[1] + `px`;
}



function initSnake(){
    let snakeHead = new bodyPart(startX, startY);
    snakeBody.push(snakeHead);
    game.appendChild(snakeBody[0].body);
}

initSnake();
