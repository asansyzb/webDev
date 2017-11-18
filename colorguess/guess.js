var gameMode = 6;
var colors = [];
var score = 0;
var pickedColor;
var clickDisabled = false;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");
var scoreDisplay = document.querySelector("#score");
var t;
var clearT = false;
init();


function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			score = 0;
			scoreDisplay.textContent = "Your score: " + score;
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? gameMode = 3: gameMode = 6;
			reset();
		});
	}
}
function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
	// add click listeners to squares
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if (!clickDisabled) {
				if (clickedColor === pickedColor) {
					clickDisabled = true;
					messageDisplay.textContent = "Correct!";
					resetButton.textContent = "Play Again?"
					h1.style.backgroundColor = clickedColor;
					changeColors(clickedColor);
					score += 3;
					scoreDisplay.textContent = "Your score: " + score;
					t = setTimeout(function() {
						clickDisabled = false;
						reset();
					}, 4000);
					clearT = true;
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again!";
				score -= 2;
				scoreDisplay.textContent = "Your score: " + score;
			}
			}
			
		});
	}
}
function reset() {	
	if (clearT) {
		clearTimeout(t);
		clearT = false;
		console.log("i am here");
		clickDisabled = false;
	}

	colors = generateRandomColors(gameMode);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors"

	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
}



resetButton.addEventListener("click", function() {
	reset();
});
function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(n) {
	var a = [];
	for (var i = 0; i < n; i++) {
		a.push(randomColor());
	}
	return a;
};

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}