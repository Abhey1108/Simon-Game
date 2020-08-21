var colorButtons = ["green", "red", "yellow", "blue"];

var patternCreated = [];

var patternPlayed = [];

var levelNumber = 1;

// Press A key to Start ----------------------------------------------------------------------------

$(document).keypress(function () {
  beginGame();
});
// Function to Begin Game ----------------------------------------------------------------------------

function beginGame() {
  changeLevelName();
  createPattern();
  recordPattern();
}

// Function to change Level Number ---------------------------------------------------------------------

function changeLevelName() {
  $("#level-title").text("Level " + levelNumber);
}

// Function to Create the Pattern ------------------------------------------------------------------------

function createPattern() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColorChosen = colorButtons[randomNumber];
  $("." + randomColorChosen)
    .fadeOut()
    .fadeIn();
  patternCreated.push(randomColorChosen);
  colorButtonsSounds(randomColorChosen);
}

// Function to play sound ------------------------------------------------------------------------------

function colorButtonsSounds(colorChosen) {
  switch (colorChosen) {
    case "green":
      var greenButtonSound = new Audio("/sounds/green.mp3");
      greenButtonSound.play();
      break;

    case "red":
      var redButtonSound = new Audio("/sounds/red.mp3");
      redButtonSound.play();
      break;

    case "yellow":
      var yellowButtonSound = new Audio("/sounds/yellow.mp3");
      yellowButtonSound.play();
      break;

    case "blue":
      var blueButtonSound = new Audio("/sounds/blue.mp3");
      blueButtonSound.play();
      break;

    default:
      alert("Oops! Error :(");
      break;
  }
}

//  Function to record Pattern ----------------------------------------------------------------------

function recordPattern() {
  for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document
      .querySelectorAll(".btn")
      [i].addEventListener("click", function (e) {
        var buttonClicked = this.classList[1];
        $("." + buttonClicked)
          .fadeOut()
          .fadeIn();
        colorButtonsSounds(buttonClicked);
        patternPlayed.push(buttonClicked);
        checkPattern();
      });
  }
}

//  Function to check Pattern ---------------------------------------------------------------------------

function checkPattern() {
  if (patternCreated.length === patternPlayed.length) {
    if (JSON.stringify(patternCreated) === JSON.stringify(patternPlayed)) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  }
}

//  When ther is  Correct Answer --------------------------------------------------------------------------

function correctAnswer() {
  levelNumber++;
  patternPlayed = [];
  setTimeout(function () {
    changeLevelName();
    createPattern();
  }, 1000);
}

// When answer is wrong ------------------------------------------------------------------------------------

function wrongAnswer() {
  $("#level-title").text("Game Over!");
  var wrongAnswerSound = new Audio("/sounds/wrong.mp3");
  wrongAnswerSound.play();
  setTimeout(function () {
    $("#level-title").text("Refersh To begin again");
  }, 3000);
}
//  ------------------------------------------------ The End -----------------------------------------------