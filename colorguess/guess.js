var gameMode = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");
var t;
init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
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
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				h1.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
				t = setTimeout(function() {
					init();
				}, 4000);
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again!";
			}
		});
	}
}
function reset() {	
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
	clearTimeout(t);
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