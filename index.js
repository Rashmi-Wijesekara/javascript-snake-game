const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
let score = document.getElementById('score')
let squares = []
let snake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let totalScore = 0
let speed = 900
let timerId = 0

createGrid()
snake.forEach(index => squares[index].classList.add('snake'))
generateApples()
document.addEventListener("keyup", control)
startButton.addEventListener("click", startGame)


// create the grid
function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        
        square.classList.add('square')
        grid.appendChild(square)

        squares.push(square)
    }
}

// starting OR restarting the game
function startGame() {

    // remove the previous snake
    snake.forEach(index => squares[index].classList.remove('snake'))

    // remove the previous apple & generate the new apple
    squares[appleIndex].classList.remove('apple')
    generateApples()

    clearInterval(timerId)
    snake = [2,1,0]
    direction = 1

    // add the new snake
    snake.forEach(index => squares[index].classList.add('snake'))
    
    // re add new score
    totalScore = 0
    score.textContent = totalScore

    speed = 900
    timerId = setInterval(move, speed)
}

// move the snake inside the grid
function move() {

    // check if the snake is hit on a wall
    if(
        (snake[0] + width >= width*width && direction === width) || //bottom
        (snake[0] % width === width-1 && direction === 1) ||   //right
        (snake[0] % width === 0 && direction === -1) ||  //left
        (snake[0] - width < 0 && direction === -width) ||   //top
        squares[snake[0] + direction].classList.contains('snake')
    ){
        console.log('failed')
        return clearInterval(timerId)
    }

    const tail = snake.pop()

    squares[tail].classList.remove('snake')
    snake.unshift(snake[0] + direction)

    // if the snake ate an apple
    if(snake[0] === appleIndex)
    {
        // increase the length of the snake
        squares[snake[0]].classList.remove('apple') 
        snake.push(tail)
        squares[snake[0]].classList.add('snake')

        // update the score
        totalScore++
        score.textContent = totalScore
        generateApples()

        // increase the speed of the snake
        speed = speed * 0.9
        clearInterval(timerId)
        timerId= setInterval(move, speed)
    }
    squares[snake[0]].classList.add('snake')
}

// generate apples one by one at random places
function generateApples() {

    do {
        appleIndex = Math.floor(Math.random() * squares.length)
        console.log(appleIndex)

    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}

// change the direction of the snake according to the key pressed
function control(e)
{
    if(e.keyCode == 39)         // right
    {
        direction = 1
    }
    
    else if(e.keyCode == 38)    // up
    {
        direction = -width
    }
    
    else if(e.keyCode == 37)    // left
    {
        direction = -1
    }
    
    else if(e.keyCode == 40)    // down
    {
        direction = +width
    }
}
