//Declare variables
var mysteryWordList = ["Chameleon","Badger","Porcupine","Platypus"]
var mysteryWord;
var wins, losses = 0;
var lettersGuessed = [];
var numTries = 9;
var input = "";

document.addEventListener('keydown', function(event) {
	document.getElementById("input").innerHTML = event.key;
});

//main loop
init();

//function declarations
function init() {
	mysteryWord = mysteryWordList[Math.floor(Math.random()*mysteryWordList.length)];
	document.getElementById("board").innerHTML = hideWord(mysteryWord);
	document.getElementById("lettersGuessed").innerHTML = "None";
	numTries = 9;
	setImg(9);
	input = "";
	document.getElementById("input").innerHTML = input;
}

// "Word" returns "_ _ _ _"
function hideWord(word) {
	var hidden = "";
	for (var i=0;i<word.length-1;i++) {
		hidden+="_ "
	}
	hidden+="_";
	return hidden;
}

function setImg(num) {
	document.getElementById("hangman").src="assets/images/hangman"+num+".jpg";
}

