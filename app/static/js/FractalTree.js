// done with tutorial from Franks laboratory
// https://www.youtube.com/watch?v=wBAtHDdaZ2Y&t=153s&ab_channel=Frankslaboratory
//

let canvas = document.querySelector('canvas');
const generateTreeButton = document.querySelector('.generateTree');

canvas.height = 1300;
canvas.width = 1500;

const ctx = canvas.getContext('2d');

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 7;
    ctx.shadowColor = "Purple";
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    //ctx.lineTo(0, -len);
    if (angle > 0 ){
	ctx.bezierCurveTo(15, -len/3, 10, -len/3, 0, -len);
    } else   {
	ctx.bezierCurveTo(-25, -len/3, 10, -len/3, 0, -len);
    }
    ctx.stroke();

    if(len < 10) {
	//leafs
	ctx.beginPath();
	ctx.arc(0, -len, 10, 0, Math.PI/2);
	ctx.fill();
	ctx.restore();
	return;
    }

    const angleDiff = Math.random()*10 + 10;
    const lenScale = 0.77;
    const widthScale = 0.66;

    drawTree(0, -len, len * lenScale, angle + angleDiff, branchWidth * widthScale);
    drawTree(0, -len, len * lenScale, angle - angleDiff, branchWidth * widthScale);

    ctx.restore();
}

let startX = canvas.width/2;
let startY = canvas.height - 80;
let len = canvas.width*0.17;
let angle = -4;
let branchWidth = canvas.width*0.014;
let color1 = 'white';
let color2 = 'red';

drawTree(startX, startY, len, angle, branchWidth, color1, color2);

function generateRandomTree() {

    ctx.clearRect(0,0,canvas.width, canvas.height);
    let lenRand = Math.floor(Math.random() * canvas.width*0.07)*1.5 + canvas.width*0.1;
    let branchWidth = Math.random()*20 + 1;

    let red = Math.random()*255;
    let red2 = Math.random()*255;
    let green = Math.random()*255;
    let green2 = Math.random()*255;
    let blue = Math.random()*255;
    let blue2 = Math.random()*255;
    let color1 = 'rgb(' + red + ',' + green + ',' + blue + ')';
    let color2 = 'rgb(' + red2 + ',' + green2 + ',' + blue2 + ')';

    drawTree(startX, startY, len, angle, branchWidth, color1, color2);
    generateTreeButton.style.backgroundColor = color1;
}

generateTreeButton.addEventListener('click', generateRandomTree);

