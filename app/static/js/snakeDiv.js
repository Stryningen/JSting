let game = document.getElementById(`game-board`);
let game_over = false;
//snake
let size = 20;
let color = `grey`;
let startX = 10;
let startY = 10;
let snakeBody = [];
let direction = `Numpad6`; //right
let speed = 0.5;
//apple
let is_apple = false;
let apple_pos;
let score = 0;

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

function game_loop(){
    if(game_over){
        console.log(`game Over`);
    }
    move(direction);
    check_move(snakeBody);
    console.log(direction);
    requestAnimationFrame(game_loop);
}

function update_pos(delta_x, delta_y){
    let temp_pos1 = snakeBody[0].pos;
    let temp_pos2;
    snakeBody[0].pos[0] += delta_x;
    snakeBody[0].pos[1] += delta_y;
    snakeBody[0].body.style.left = snakeBody[0].pos[0] + `px`;
    snakeBody[0].body.style.top = snakeBody[0].pos[1] + `px`;
    for (let i = 1; i < snakeBody.length; i++){
        temp_pos2 = snakeBody[i];
        snakeBody[i].pos = temp_pos1;
        temp_pos1 = temp_pos2;
        snakeBody[0].body.style.left = snakeBody[0].pos[0] + `px`;
        snakeBody[0].body.style.top = snakeBody[0].pos[1] + `px`;
    }
}

function move(direction){
    switch(direction){
    case `Numpad8`: //up
	    update_pos(0, -speed);
	    break;
    case `Numpad2`: //down
	    update_pos(0, speed);
	    break;
    case `Numpad4`: //left
	    update_pos(-speed, 0);
	    break;
    case `Numpad6`: //right
	    update_pos(speed, 0);
	    break;
    }

}

function check_move(snakeBody){
    if(snakeBody[0].pos[0] <= 0 || snakeBody[0].pos[0] >= game.style.width){
        game_over = true;
	console.log(game.style.width);
    }
    else if(snakeBody[0].pos[1] <= 0 || snakeBody[0].pos[1] >= game.innerHeight){
        game_over = true;
	console.log(game.innerHeight);
    }
    for(let i = 1; i < snakeBody.length; i++){
        if(snakeBody[0].pos === snakeBody[i].pos){
	 game_over = true;
        }
    }


}

function create_apple(x, y){
    this.body = document.createElement(`div`);
    this.pos = [x, y];

    this.body.setAttribute(`style`,  `width: ` + size + `px; height: ` + size + `px;`);
    this.body.style.width = size + `px;`;
    this.body.style.height = size + `px;`;
    this.body.style.backgroundColor = `green`;
    this.body.style.position = `relative`;
    this.body.style.zIndex = 10;
    this.body.style.left = x + `px`;
    this.body.style.top = y + `px`;

    game.appendChild(this.body);
    apple_pos = this.pos;
}

window.addEventListener(`keypress`, (e)=> {
    switch(e.code){
    case `Numpad8`: //up
	    direction = e.code;
	    break;
    case `Numpad2`: //down
	    direction = e.code;
	    break;
    case `Numpad4`: //left
	    direction = e.code;
	    break;
    case `Numpad6`: //right
	    direction = e.code;
	    break;
    }
});

initSnake();
//game_loop();
