// import { name1, name2, add } from "./java.js";
// console.log(name1, name2);
// add(2,3);

const canvas = document.querySelector('canvas');
const ctx=canvas.getContext('2d');//kis dimension mein rakhna hai vo btata hai.
let square = 50;//if height and width is same no need to write twice.
var snakeCell = [[0,0]];
let bheight=550;
let bwidth=1250;
let direction = 'right';
let gameOver=false;
let foodG=generateRandomCell();
let score=0;

document.addEventListener('keydown', function(e){
    //console.log(e);
    if(e.key==='ArrowRight'){
        direction='right'
    }
    else if(e.key==='ArrowLeft'){
        direction='left'
    }
    else if(e.key==='ArrowDown'){
        direction='down';
    }
    else{
        direction='up';
    }
})


function update(){
    //console.log('update hello');
    headX=snakeCell[snakeCell.length-1][0];
    headY=snakeCell[snakeCell.length-1][1];
    if(direction==='right'){
        newX=headX+square;
        newY=headY;
        if(newX===bwidth){
            gameOver=true;
        }
    }
    else if(direction==='down'){
        newX=headX;
        newY=headY+square;
        if(newY===bheight){
            gameOver=true;
        }
    }
    else if(direction==='left'){
        newX=headX-square;
        newY=headY;
        if(newX<0){
            gameOver=true;
        }
    }
    else{
        newX=headX;
        newY=headY-square;
        if(newY<0){
            gameOver=true;
        }
    }
    // newX=headX+square;
    // newY=headY;
    snakeCell.push([newX,newY]);
    if(newX===foodG[0] && newY===foodG[1]){
        foodG=generateRandomCell();
        score+=10;
    }
    else{
        snakeCell.shift();
    }
}
function draw(){
    if(gameOver===true){
        clearInterval(id);
        ctx.font='50px sans-serif';
        ctx.fillText('Gameover',60,70);
        return;
    }
    ctx.clearRect(0,0,bwidth,bheight);
    for(let cell of snakeCell){
        ctx.fillStyle='cyan';
        ctx.fillRect(cell[0],cell[1],square,square);
    }
    ctx.fillStyle='black';
    ctx.fillRect(foodG[0],foodG[1],square,square);
    ctx.font='20px sans-serif';
    ctx.fillText(`Score : ${score}`,20,20);
}

let id=setInterval(function(){
    update()
    draw()
},150)
// ctx.fillStyle='black';
// ctx.fillRect(10,20,50,60);//1st-x coordinate 2nd-y coordinate 3rd-height 4th-width.
//console.log(Math.round(Math.random()*100)/100);
function generateRandomCell(){
    return[Math.round(Math.random()*(bwidth-square)/square)*square,
    Math.round(Math.random()*(bheight-square)/square)*square
]
}
