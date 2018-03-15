//HTML Pointer variables
var msg = document.getElementById("msg");
var attemptsLeft = document.getElementById("attemptsLeft");
var board = document.getElementById("board");
var guessedDisp = document.getElementById("lettersGuessed");
var winDisp = document.getElementById("winDisp");
var lossDisp = document.getElementById("lossDisp");
var img = document.getElementById("mainImg");

//Declare variables
var mysteryWordList = ["DETHKLOK","BEHEMOTH","MASTODON"]; //ALL CAPS ONLY
var mysteryWord, numTries, wins = 0, losses = 0;
var lettersGuessed = [];
var gameState; //reset->>on->over->reset
var song = new Audio();

winDisp.textContent = wins;
lossDisp.textContent = losses;

//main loop
reset();

document.onkeydown = function(evt) {
	if (evt.key == 'Enter' && gameState == 'reset') {
		init();
	}
	else if (validEntry(evt.key) && gameState == 'on') {
		update(evt.key.toUpperCase());
	}
	else if (evt.key == ' ' && gameState == 'over') {
		reset();
	}
}

//Game functions
function reset() {
	gameState = 'reset';
	msg.textContent = "Press Enter to begin!"
	attemptsLeft.textContent = "";
	board.innerHTML ="&#9830;&#9830;&#9830;&#9830;&#9830;&#9830;&#9830;&#9830;&#9830;&#9830;";
	guessedDisp.textContent = "";
	img.src = "assets/images/splash.jpg";
	song.pause();
}

function init() {
	//change game state
	gameState = 'on';

	//reset variables
	numTries = 9;
	mysteryWord = mysteryWordList[Math.floor(Math.random()*mysteryWordList.length)];
	lettersGuessed = [];

	//updateHTML
	msg.textContent = " ";
	attemptsLeft.textContent = numTries;
	board.textContent = updateBoard(mysteryWord, lettersGuessed);
	img.src = "assets/images/hangman9.jpg";
}

function update(letter) {
	//Check if letter right or wrong
	var correct = false;
	for (var i=0;i<mysteryWord.length;i++) {
		if (letter == mysteryWord[i]) {
			correct = true;
		}
	}
	//update letters guessed var and display
	lettersGuessed.push(letter);	
	var gString = "";
	for (var i=0;i<lettersGuessed.length;i++) {
		gString+=lettersGuessed[i]+", ";
	}
	guessedDisp.textContent = gString;
	//Update board/attempts
	if (correct) {
		board.textContent = updateBoard(mysteryWord, lettersGuessed);
	}
	else {
		numTries-=1;
		attemptsLeft.textContent = numTries;
		img.src = "assets/images/hangman"+numTries+".jpg";
	}
	//Check for game loss
	if (numTries<1) {
		gameLose();
	}
	//Check for game win
	var win = true;
	var i=0;
	while (i<board.textContent.length && win==true) {
		if (board.textContent[i]=='_') {
			win = false;
		}
		i++;
	}
	if (win) {
		gameWin();
	}
}

function gameLose() {
	gameState = 'over';
	msg.innerHTML = "You lose!<br/>Press Space to reset";
	losses+=1;
	lossDisp.textContent = losses;
}

function gameWin() {
	gameState = 'over';
	msg.innerHTML = "Rock on!<br/>Press Space to reset";
	wins+=1;
	winDisp.textContent = wins;
	switch (mysteryWord) {
		case ('DETHKLOK'):
			song.src = ('assets/sound/dethklok.mp3');
			song.play();
			img.src = 'assets/images/dethklok.jpg';
			break;
		case ('BEHEMOTH'):
			song.src = ('assets/sound/behemoth.mp3');
			song.play();
			img.src = 'assets/images/behemoth.jpg';
			break;
		case ('MASTODON'):
			song.src = ('assets/sound/mastodon.mp3');
			song.play();
			img.src = 'assets/images/mastodon.jpg';
			break;
	} 
}

//Helper functions
function updateBoard(word, lettersGuessed) {
    var output = "";
    for (var i=0;i<word.length;i++) {
        if (lettersGuessed.indexOf(word[i])<0) {
            output+="_ ";
        }
        else {
            output+=word[i]+" ";
        }
    }
    output = output.slice(0,output.length-1);
    return output;
}

function validEntry(letter) {
	if (letter>='a' && letter<='z') {
		letter = letter.toUpperCase();
		for (var i=0;i<lettersGuessed.length;i++) {
			if (letter == lettersGuessed[i]) {
				return false;
			}
		}
		return true;
	}
	else {
		return false;
	}
}

