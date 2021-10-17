document.addEventListener('DOMContentLoaded',()=>{
	const grid = document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const width = 28  //28 x 28 =784squares
 let score = 0

	// layout or grid

	const layout = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]


const squares = []
//legend
//0-pacdot
//1-wall
//2-ghost-liar
//3-power-palet
//4-empty

//draw the grid and render it

function createBoard(){
	for(let i=0; i<layout.length; i++){
		const square = document.createElement('div')
		grid.appendChild(square)
		squares.push(square)

		//add layout to the board

		if(layout[i] === 0){
    squares[i].classList.add('pac-dot')          
		}else if(layout[i] === 1){
			squares[i].classList.add('wall')
		}else if(layout[i] === 3){
			squares[i].classList.add('power-pallets')
		}else if(layout[i] === 2){
			squares[i].classList.add('ghost-liar')
		}
	}
}
createBoard();

//starting position of pacman

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pac-man')

function movePacman(e){
 squares[pacmanCurrentIndex].classList.remove('pac-man')
 switch(e.keyCode){
 	case 37:
 	 if(pacmanCurrentIndex%width !==0 && !squares[pacmanCurrentIndex-1].classList.contains('wall') && !squares[pacmanCurrentIndex-1].classList.contains('ghost-liar'))
 	 	pacmanCurrentIndex-=1
    
    // check if pacman is in the left exit
    if((pacmanCurrentIndex-1)===363){
    	pacmanCurrentIndex = 391
    }
 	  break
 	case 38:
 	 if(pacmanCurrentIndex-width >=0 && !squares[pacmanCurrentIndex-width].classList.contains('wall') && !squares[pacmanCurrentIndex-width].classList.contains('ghost-liar'))
 	 	pacmanCurrentIndex-=width
 	  break
 	  case 39:
 	 if(pacmanCurrentIndex%width < width-1 && !squares[pacmanCurrentIndex+1].classList.contains('wall') && !squares[pacmanCurrentIndex+1].classList.contains('ghost-liar'))
 	 	pacmanCurrentIndex+=1

 	 //check if pacman is in  right exit
 	 if((pacmanCurrentIndex+1)===392){
    	pacmanCurrentIndex = 364
    }
 	  break
 	  case 40:
 	 if(pacmanCurrentIndex+width < width*width && !squares[pacmanCurrentIndex+width].classList.contains('wall') && !squares[pacmanCurrentIndex+width].classList.contains('ghost-liar'))
 	 	pacmanCurrentIndex+=width
 	  break
 }

 squares[pacmanCurrentIndex].classList.add('pac-man')

 //pacDotEaten
 pacDotEaten()
 powerPalletEaten()
 checkGameOver()
 checkForWin()




}
document.addEventListener('keyup',movePacman)

// what happens whenn pacman eats a pac-dot
function pacDotEaten(){
	if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
		score++
		scoreDisplay.innerHTML = score
		squares[pacmanCurrentIndex].classList.remove('pac-dot')
	}
}
//what happens when youn eat power pellet
function powerPalletEaten(){
 if(squares[pacmanCurrentIndex].classList.contains('power-pallets')){
  score += 10
  ghosts.forEach(ghost => ghost.isScared = true)
  setTimeout(unScareGhost,10000)
  squares[pacmanCurrentIndex].classList.remove('power-pallets')
 }
}

//make the ghost stop appearing as aquamarine

function unScareGhost(){
 ghosts.forEach(ghost=>ghost.isScared = false)
}

//create our ghost template

class Ghost {
	constructor(className,startIndex,speed){
		this.className = className
		this.startIndex = startIndex
		this.speed = speed
		this.currentIndex = startIndex
		this.timerId = NaN
  this.isScared = false
	}
}

ghosts = [
 new Ghost('blinky',348,250),
 new Ghost('pinky',376,400),
 new Ghost('inky',371,300),
 new Ghost('clyde',379,500),
]

//draw my ghosts into the grid


ghosts.forEach(ghost => {
	squares[ghost.currentIndex].classList.add(ghost.className)
	squares[ghost.currentIndex].classList.add('ghost')
	
})

//move the ghost randomly

ghosts.forEach(ghost => moveGhost(ghost))

//write a function to move the ghost 

function moveGhost(ghost){
 const directions = [-1,+1,width,-width]
 let direction = directions[Math.floor(Math.random()*directions.length)]
 ghost.timerId = setInterval(function(){
   if(!squares[ghost.currentIndex + direction].classList.contains('wall') && 
    !squares[ghost.currentIndex + direction].classList.contains('ghost')){
     //you can go there
     //remove all ghost related classes
    squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
     //change the current indecx to new safe index
     ghost.currentIndex += direction
     //redraw wthe ghost in a new safe place
     squares[ghost.currentIndex].classList.add(ghost.className,'ghost')

    //else find new direction
   }else direction = directions[Math.floor(Math.random()*directions.length)]

    //if the ghost is curently scared
    if(ghost.isScared){
     squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghost is scared and pacman runs into it

    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
     squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
     ghost.currentIndex = ghost.startIndex
     score +=100
     squares[ghost.curentIndex].classList.add(ghost.className,'ghost')
    }

 },ghost.speed)

}

//check for a game over

function checkGameOver(){
 if(squares[pacmanCurrentIndex].classList.contains('ghost') 
  && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
  ghosts.forEach(ghost => clearInterval(ghost.timerId))
 document.removeEventListener('keyup',movePacman)
 setTimeout(function(){alert('Game Over!!')},500)
 scoreDisplay.innerHTML = 'Game Over'
 }
}


function checkForWin(){
 if(score === 274){
   ghosts.forEach(ghost => clearInterval(ghost.timerId))
 document.removeEventListener('keyup',movePacman)
 
 scoreDisplay.innerHTML = 'You Win'
 }
}








})