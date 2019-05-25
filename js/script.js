/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying, previousDice, winScore;
 

initGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        
        // 1 Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        
        // Player looses his ENTIRE score when he rolls two 6 in row
        if(dice === 6 && previousDice === dice){
            // change player-score to 0
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            
            // change the player 
            changePlayer();
        }
        previousDice = dice;
        
        // 2 set & Display the result to dice img
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-'+ dice +'.png';
        
        // 3 update current score IF the rolled number was NOT a 1
        if (dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            // change the player 
            changePlayer();
        }    
    }
    
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying){
       // update player-score 
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if(scores[activePlayer] >= winScore){
            document.getElementById('name-'+ activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }else{        
            // change the player 
            changePlayer();
        } 
    }
    
    
});

document.querySelector('.btn-new').addEventListener('click', initGame);

document.querySelector('.btn-input').addEventListener('input', changeWinScore);

function initGame(){
    
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice = null;
    winScore = 50;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function changePlayer(){
    // reset & display current score 
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    
    // remove active class & hide dice img 
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    
    // change current player & add  
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    
}

function changeWinScore(){
    winScore = document.getElementById('winscore').value;
}



