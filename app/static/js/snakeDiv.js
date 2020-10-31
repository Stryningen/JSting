let game = document.getElementById(`game-board`);
let game_over = false;
let frame_counter = 0;
let score_counter = 0;
//snake
let size = 20;
let color = `grey`;
let startX = 20;
let startY = 20;
let snakeBody = [];
let old_pos;
let direction = `Numpad6`; //right
let speed = 23;
//apple
let is_apple = false;
let apple_body;
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
    this.body.style.zIndex = 15;
    this.body.style.left = this.pos[0] + `px`;
    this.body.style.top = this.pos[1] + `px`;
}



function initGame(){
    let snakeHead = new bodyPart(startX, startY);
    snakeBody.push(snakeHead);
    game.appendChild(snakeBody[0].body);


    create_apple();

}

function resetSnake(){
    snakeBody = [snakeBody[0]];
    snakeBody[0].pos = [startX, startY];
    snakeBody[0].body.style.left = snakeBody[0].pos[0] + `px`;
    snakeBody[0].body.style.top = snakeBody[0].pos[1] + `px`;
}

function game_loop(){
    if(frame_counter % speed === 0){
        move(direction);
        check_move(snakeBody);
    }
    frame_counter++;
    if(!game_over){
        requestAnimationFrame(game_loop);
    } else {
        game_over = false;
        frame_counter = 0;
        direction = `Numpad6`; //right
        resetSnake();
    }
}

function update_pos(delta_x, delta_y){
    let temp_pos1 = snakeBody[0].pos;
    let temp_pos2;
    old_pos = snakeBody[snakeBody.length - 1].pos;
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
	    update_pos(0, -size);
	    break;
    case `Numpad2`: //down
	    update_pos(0, size);
	    break;
    case `Numpad4`: //left
	    update_pos(-size, 0);
	    break;
    case `Numpad6`: //right
	    update_pos(size, 0);
	    break;
    }

}

function check_move(snakeBody){
    if(snakeBody[0].pos[0] <= 0 || snakeBody[0].pos[0] >= game.clientWidth){
        game_over = true;
    }
    else if(snakeBody[0].pos[1] <= 0 || snakeBody[0].pos[1] >= game.clientHeight){
        game_over = true;
    }
    for(let i = 1; i < snakeBody.length; i++){
        if(snakeBody[0].pos === snakeBody[i].pos){
	 game_over = true;
        }
    }
    if(snakeBody[0].pos[0] == apple_pos[0] && snakeBody[0].pos[1] == apple_pos[1]){
	score_counter++;
    }
}

function create_apple(){
    if(apple_body != null){
	console.log("test");
    }
    apple_body = document.createElement(`div`);

    let x = Math.floor(Math.random()*game.clientWidth);
    x -= x % size;
    let y = Math.floor(Math.random()*game.clientHeight);
    y -= y % size;

    apple_body.setAttribute(`style`,  `width: ` + size + `px; height: ` + size + `px;`);
    apple_body.style.width = size + `px;`;
    apple_body.style.height = size + `px;`;
    apple_body.style.backgroundColor = `green`;
    apple_body.style.position = `relative`;
    apple_body.style.zIndex = 10;
    apple_body.style.left = x + `px`;
    apple_body.style.top = y + `px`;

    game.appendChild(apple_body);
    apple_pos = [x, y];
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

initGame();
//game_loop();
