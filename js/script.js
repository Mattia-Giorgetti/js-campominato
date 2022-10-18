
const startBtn = document.getElementById('start_btn');
const titleh1 = document.querySelector('h1');

// funzione per far partire il gioco 
function playNow(){

    let cellNumber;
    let score = 0;
    const playGround = document.getElementById('playground');
    playGround.innerHTML = '';
    titleh1.classList.add('d-none');
    const totalBombs = 16;
    const bombsPosition = [];
    const difficultyLevel = document.getElementById('difficulty_select').value;
    
    // Switch per determinare il numero di celle 
    switch(difficultyLevel){
        case 'easy':
            cellNumber = 100;
            break;
        case 'medium':
            cellNumber = 81;
            break
        case 'hard':
            cellNumber = 49;
            break;
    }
    // Ciclo While per creare la posizione delle bombe 
    while(bombsPosition.length < totalBombs){
        const singleBomb = randomNumber(1, cellNumber);
        if(!bombsPosition.includes(singleBomb)){
            bombsPosition.push(singleBomb);
        }
    }

    const maxAttempt = cellNumber - totalBombs;
    let scoreCount = document.createElement('p');
    scoreCount.classList.add('mt-3', 'fs-1', 'cyan_txt');
    let endGameMessage = document.createElement('div');
    const replayBtn = document.createElement('button');
    replayBtn.innerHTML = 'Retry';
    replayBtn.classList.add('btn','btn-info', 'd-none');

    // Funzione quando fai click sulla cella 
    function chooseCell(){
        const span = this.querySelector('span');
        const num = parseInt(span.innerText);
        this.removeEventListener('click', chooseCell);
            score++;
            // console.log(score);
            scoreCount.innerHTML = `${score}`;
            if(!bombsPosition.includes(num)){
                this.classList.add('green_bg');
                if(score === maxAttempt){
                    gameOver();
                }
            } else {
                this.classList.add('red_bg');
                gameOver();
            }
        }
    
    // Creazione cella 
    function createCell(num){
        const cellPerSide = Math.sqrt(cellNumber);
        const myCell = document.createElement('div');
        myCell.className = 'square';
        // dimensiono le cells in base alla difficoltà 
        myCell.style.width = `calc(100% / ${cellPerSide})`;
        myCell.style.height = `calc(100% / ${cellPerSide})`;
        myCell.innerHTML = `<span>${num}</span>`;

        myCell.addEventListener('click', chooseCell);
        return myCell;
    }
    // Creazione griglia di gioco 
   
    function createGrid(){
        const myGrid = document.createElement('div');
        myGrid.className = 'grid_template';
        for(let i = 1; i <= cellNumber; i++){
            const myCell = createCell(i);
            myGrid.append(myCell);
        }
        playGround.append(myGrid);
    }
    // Creazione Score Board 
    function createScoreBoard(){
        const scoreBoard = document.createElement('div');
        scoreBoard.className = ('score_board');
        const boardTitle = document.createElement('h3');
        boardTitle.classList.add('fs-1', 'mb-5','indigo_txt');
        boardTitle.innerHTML = `Score Board`;
        const yourScore = document.createElement('h4');
        yourScore.className = ('indigo_txt');
        yourScore.innerHTML = `Your Score:`;
        scoreBoard.append(boardTitle, yourScore, scoreCount, endGameMessage);
        playGround.append(scoreBoard);
        scoreBoard.append(replayBtn);
    }
    
    // Avvio creazione griglia e scoreboard
    createScoreBoard();
    createGrid();

    // Funzione che determina cosa succede alla fine del gioco 
    function gameOver(){
        const squares = document.getElementsByClassName('square');
        for(let i = 0; i < squares.length; i++){
            squares[i].removeEventListener('click', chooseCell);
            let num = i+1;
            if(bombsPosition.includes(num)){
                squares[i].classList.add('red_bg');
            }
        }
        if(score === maxAttempt){
            endGameMessage.innerHTML = `Hai vinto!`;
            endGameMessage.classList.add('text-success','mt-4', 'fs-1');
            scoreCount.innerHTML = `${parseInt(score)-1}`;

            // appare il bottone che fa ricominciare la partita
            replayBtn.classList.remove('d-none');
            replayBtn.addEventListener('click', playNow);
        } else {
            endGameMessage.innerHTML = `Hai Perso`;
            endGameMessage.classList.add('text-danger','mt-auto','pb-4', 'fs-1');
            scoreCount.innerHTML = `${parseInt(score)-1}`;

            // appare il bottone che fa ricominciare la partita 
            replayBtn.classList.remove('d-none');
            replayBtn.addEventListener('click', playNow);
        }
    }
}
startBtn.addEventListener('click', playNow);