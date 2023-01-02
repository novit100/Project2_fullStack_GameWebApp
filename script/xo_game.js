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

// <-- code for html elements -->
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const userName = document.getElementById('user-name')
const Uname = document.cookie.split('=')[1] || JSON.parse(localStorage.getItem('currentUser'));
userName.innerText += " " + Uname;
const signOut = document.getElementById('sign-out');

// <-- code for score elments-->
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');
const scoreScaling = document.getElementById('score-scaling');

// <-- code for score variables get out from local storage from to: -->
let formData = JSON.parse(localStorage.getItem('formData')) || [];
let exist = formData.length && JSON.parse(localStorage.getItem('formData'))
  .some(data => data.username.toLowerCase() == Uname.toLowerCase());

index = formData.findIndex(data => data.username.toLowerCase() == Uname.toLowerCase());
let scoreXValue = exist ? formData[index]['scoreX'] : 0;
let scoreOValue = exist ? formData[index]['scoreO'] : 0;
let scoreDrawValue = exist ? formData[index]['scoreDraw'] : 0;
let scoreScalingValue = exist ? formData[index]['scoreScaling'] : 0;

scoreX.innerText = scoreXValue;
scoreO.innerText = scoreOValue;
scoreDraw.innerText = scoreDrawValue;
scoreScaling.innerText = scoreScalingValue;



// <-- delete cookie when user click on sign out -->
signOut.addEventListener('click', () => {
  document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

restartButton.addEventListener('click', startGame)
let circleTurn

startGame()
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
    end_with_draw();
  } else {
    winningMessageTextElement.innerText = `הניצחון של ${circleTurn ? "O" : "X"} !`
    if (circleTurn) {
      winO();
    } else {
      winX();
    }
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

// <-- code for score -->

//<-- draw -->
function end_with_draw() {
  //store the score in local storage in the formData table in user index in scoreDraw value.
  formData[index]['scoreDraw']++;
  localStorage.setItem('formData', JSON.stringify(formData));

  //store the score in local storage in the formData table in user index in scoreScaling value.
  formData[index]['scoreScaling']<3?0:formData[index]['scoreScaling'] -=2;
  localStorage.setItem('formData', JSON.stringify(formData));

  //update the score in html.
  scoreDraw.innerText = formData[index]['scoreDraw'];
  scoreScaling.innerText = formData[index]['scoreScaling'];
}

//<-- wining x -->
function winX() {
  //store the score in local storage in the formData table in user index in scoreX value.
  formData[index]['scoreX']++;
  localStorage.setItem('formData', JSON.stringify(formData));

  //store the score in local storage in the formData table in user index in scoreScaling value.
  formData[index]['scoreScaling'] += 3;
  localStorage.setItem('formData', JSON.stringify(formData));

  //update the score in html.
  scoreX.innerText = formData[index]['scoreX'];
  scoreScaling.innerText = formData[index]['scoreScaling'];
}

//<-- wining o -->
function winO() {
  //store the score in local storage in the formData table in user index in scoreO value.
  formData[index]['scoreO']++;
  localStorage.setItem('formData', JSON.stringify(formData));

  //store the score in local storage in the formData table in user index in scoreScaling value.
  formData[index]['scoreScaling'] <3 ? 0 : formData[index]['scoreScaling']-= 3;
  localStorage.setItem('formData', JSON.stringify(formData));

  //update the score in html.
  scoreO.innerText = formData[index]['scoreO'];
  scoreScaling.innerText = formData[index]['scoreScaling'];
}
