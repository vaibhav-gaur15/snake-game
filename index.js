//constants and variables
let direction = { x: 0, y: 0 };
const startsound = new Audio("sounds/gamesound.mp3");
const eatsound = new Audio("sounds/eat.mp3");
const movesound = new Audio("sounds/move.mp3");
const collidesound = new Audio("sounds/gameover.mp3");
let speed = 5;
let lastPaintTime = 0;
let food = { x: 3, y: 20 };
let snakeArray = [
    { x: 17, y: 17 }
]
let score = 0;
let hiscore=0;





//functions
function audio(){
    
    startsound.pause();
}

function main(ctime) {
    // (ctime);
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / (speed)) {//to set the refresh rate
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


//keeping check on collision
function isCollide(sarr) {
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y)
            return true;
    }
    if (sarr[0].x >= 30 || sarr[0].x <= 0 || sarr[0].y >= 30 || sarr[0].y <= 0) {
        return true;

    }

    return false;
}


function gameEngine() {


    //colliding scenario
    
    if (isCollide(snakeArray)) {
        
         {collidesound.play();}//first of all play gameover sound and pause the game music
        startsound.pause();
        alert("game over. press enter to restart");
       
        direction = { x: 0, y: 0 };//reset the snake and its direction
        snakeArray = [{ x: 25, y: 17 }];
        if(document.getElementsByTagName('button').style.getAttribute(!"aria-pressed"))
        {startsound.play();}
        score = 0;
        scoreBox.innerHTML="score:"+score;//update the score to 0

    }

    //after eating food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        
        {eatsound.play();}//eat sound for eating 
        score++;if(score>hiscore){
            hiscore=score;
            localStorage.setItem('hiscore',JSON.stringify(score));//if score surpasses the iscore, then start updating the hiscore
            hiscoreBox.innerHTML="Hiscore:"+hiscore;
        }
        scoreBox.innerHTML="score:"+score;//update score on every bite
        
        food.x =  2+ Math.round(27* Math.random());//generate a new food after eating
        food.y =  2+Math.round(27 * Math.random());
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y })
        //this unshift method is to add a new element into arra of snake
    }


    //moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };//keep shifting the divs forward and then shift the head

    }
    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;


    //create snake
    board.innerHTML = "";//remove any previous div
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;//create an element,define its position in the grid by gridRow/columnStart
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0)
            snakeElement.classList.add('head');//add classlist to apply the css to head or snake whichever it is
        else
            snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    }
    );

    //create food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;//creating the food same way as the snake
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//keypress logics
hiscore=localStorage.getItem('hiscore');
if(hiscore===null)
{
    let val=0;
    localStorage.setItem('hiscore',JSON.stringify(val));
    
}
else{
    
    hiscoreBox.innerHTML="Hiscore:"+hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    
    {startsound.play();}
    direction = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp": direction.x = 0; direction.y = -1; 

            break;
        case "ArrowDown": direction.x = 0; direction.y = 1; 

            break;
        case "ArrowRight": direction.x = 1; direction.y = 0;

            break;
        case "ArrowLeft": direction.x = -1; direction.y = 0;

            break;

        default:
            break;
    }
});

