const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('.cell')
let gridArray = Array.from(cellElements);
let tracking;
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const userName = document.getElementById('user-name')
const Uname = JSON.parse(localStorage.getItem('currentUser'));
let circleTurn
userName.innerText += " " + Uname;
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  //reset the board
  reset();

  //loop through all the board cells.
  cellElements.forEach(cell => {
    cell.addEventListener('click', (e) => {

      //player move
      const index = gridArray.indexOf(e.target);
      if (
        cellElements[index].classList.contains(X_CLASS) ||
        cellElements[index].classList.contains(CIRCLE_CLASS)) {
        return;
      }
      cellElements[index].classList.add(X_CLASS);

      //slicing the move from the tracking array.
      const spliceIndex = tracking.indexOf(index);
      tracking.splice(spliceIndex, 1);

      //win check after player move
      if (checkWin(X_CLASS)) {
        endGame(false)
        return;
      } else if (isDraw()) {
        endGame(true)
        return;
      } else {
        swapTurns()
        setBoardHoverClass()
      }

      //computer move
      const randomIndex = Math.floor(Math.random() * tracking.length);
      const randomCell = tracking[randomIndex];
      cellElements[randomCell].classList.add(CIRCLE_CLASS);

      //slicing the move from the tracking array.
      tracking.splice(randomIndex, 1);

      //win check after computer move
      if (checkWin(CIRCLE_CLASS)) {
        endGame(false)
        return;
      } else if (isDraw()) {
        endGame(true)
        return;
      } else {
        swapTurns()
        setBoardHoverClass()
      }
    })
  })
}

// reset the board
function reset() {
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
  })
  circleTurn = false;
  setBoardHoverClass();
  tracking = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  winningMessageElement.classList.remove('show')
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'תיקו!'
  } else {
    winningMessageTextElement.innerText = `הניצחון של ${circleTurn ? "O" : "X"} !`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS)
  })
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}