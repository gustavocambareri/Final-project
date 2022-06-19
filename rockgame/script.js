const selectionButtons = document.querySelectorAll('[data-selection]'); //takes information of what we click
const finalColumn = document.querySelector('[data-final-column]');
const showresult = document.querySelector(".selection");
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
var a=0;
var b=0;
const finalresultwin = document.querySelector(".final-result");
const finalresultlose = document.querySelector(".final-result-lose");
const selections_div = document.querySelector(".selections");
const play_again_btn = document.querySelector(".bottone3");


const SELECTIONS = [
  {
    name: 'rock',
    shape: 'RHOMBUS',
    beats: 'scissors',
    result: '<img id="roca" data-selection="rock" src ="./forme/3-01.png"/>'
  },
  {
    name: 'paper',
    shape: 'RECTANGLE',
    beats: 'rock',
    result: '<img id="roca" data-selection="paper" src="./forme/3-02.png"/>'
  },
  {
    name: 'scissors',
    shape: 'DOUBLE-CIRCLE',
    beats: 'paper',
    result: '<img id="roca" data-selection="scissors" src="./forme/3-03.png"/>'
  }
] // array of our possible selections




selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
}) // when we click, gives selection (e.g. rock)

function makeSelection(selection) {
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan) 
  if (yourWinner) a++; /**/
  if (computerWinner) incrementScore(computerScoreSpan)/**/
  if (computerWinner) b++; /**/
  /**/
  if (a==2){
    finalresultwin.style.display= "flex";
    finalresultlose.style.display= "none";
    selections_div.style.display=  "none";
    play_again_btn.style.display="flex";
  }
  else if(b==2){
  finalresultwin.style.display= "none";
  finalresultlose.style.display= "flex";
  selections_div.style.display=  "none";
  play_again_btn.style.display="flex";
}
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function decreaseScore(scoreSpan) {
  scoreSpan.innerText = parseInt(0)
}

function addSelectionResult(selection, winner) { /*Results*/ 
  const div = document.createElement('div')
  div.innerHTML = selection.result  
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
  /**/
  function playagain() {
    a=0;
    b=0;
    decreaseScore(yourScoreSpan);
    decreaseScore(computerScoreSpan);
    selections_div.style.display= "flex";
    finalresultwin.style.display= "none";
    finalresultlose.style.display= "none";
    play_again_btn.style.display= "none";
    div.innerHTML="";
  }
    play_again_btn.addEventListener("click", playagain);
    
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
} // gives a number between 0 and 2, and that's ok because the SELECTIONS array has 3 elements [0,1,2]

window.onload = function() {
  document.getElementById("my_audio").play();
}

function restartResults(){
  addSelectionResult() ;
}

