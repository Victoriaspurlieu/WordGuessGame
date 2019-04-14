// words list
var words = ["MERCURY", "VENUS", "EARTH", "MARS", "JUPITER", "SATURN", "URANUS", "NEPTUNE"];

var maxNumGuesses = 8; // max number of guesses 
var guessedLetters = []; // store the guessed letters
var ansWordArr = []; // store the "_" and to be used to replace the word answer
var numGuessesRemaining = 0; // number of guesses remaining
var numWins = 0; // number of wins
var numLosses = 0; // number of losses
var isFinished = false; // when true, game can start again
var ansWord; // the word that is being played

// function runs at the start of page and used to restart after game isFinished
function setup() {
    //picks random word from words list
    ansWord = words[Math.floor(Math.random() * words.length)];

    ansWordArr = [];

    // adds "_" to ansWordArr
    for (var i = 0; i < ansWord.length; i++) {
        ansWordArr[i] = "_";
    }

    // reset the variables 
    numGuessesRemaining = maxNumGuesses;
    guessedLetters = [];

    //clears giphy-embed to now show any gifs
    document.getElementById("giphy-embed").src = "";
    //removes color from numGuesses
    document.getElementById("numGuesses").style.color = "";

    //show the selected elements on the screen 
    updateScreen();
};

//updates the HTML from the functions
function updateScreen() {
    document.getElementById("numWins").innerText = numWins;
    document.getElementById("numLosses").innerText = numLosses;
    document.getElementById("numGuesses").innerText = numGuessesRemaining;
    document.getElementById("answerWord").innerText = ansWordArr.join("");
    document.getElementById("guessedLetters").innerText = guessedLetters;

};

//function to check the key that's pressed
function checkGuess(letter) {
    //if letter is not in guessedLetters array then push the letter to the array
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        //if the letter isn't in the answer word then -1 the numGuessesRemaining
        if (ansWord.indexOf(letter) === -1) {
            numGuessesRemaining--;
            //if numGuessesRemaining is 3 or less then change the color
            if (numGuessesRemaining <=3) {
                document.getElementById("numGuesses").style.color = "#FF0000";
            }
            //if letter is in answer then replace the positioned "_" with the letter
        } else { 
            for (var i = 0; i < ansWord.length; i++) {
                if (letter === ansWord[i]) {
                    ansWordArr[i] = letter;
                } 
            }                
        }
    }

}; 

//function to check if the player is a winner
function isWinner() {
    //if there are no more "_" in the ansWordArr then +1 to Wins and switch isFinished to true
    if (ansWordArr.indexOf("_") === -1) {
        numWins++;
        isFinished = true;
        //if the answer is guessed then play assigned gif
        if(ansWord === "NEPTUNE") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/xxrE5TlRSVQHe";
        } else if (ansWord === "MERCURY") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/l0HlO4V8iCRME3i0g";
        } else if (ansWord === "VENUS") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/4EEy1EnxF7cbNjLlmF";
        } else if (ansWord === "EARTH") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/WlBUAWG03Zic8";
        } else if (ansWord === "MARS") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/SusKZ4XqWDETC";
        } else if (ansWord === "JUPITER") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/s2uampOAMWksU";
        } else if (ansWord === "SATURN") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/3o7btNhwMD8J6BsxTW";
        } else if (ansWord === "URANUS") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/MemjftFfgVhvy";
        }
            
    }
};
//function to check if player is a loser
function isLoser() {
    // if the numGuessesRemaining is 0 then -1 numLosses and switch isFinished to true
    if(numGuessesRemaining <= 0) {
        numLosses++;
        isFinished = true;
        //play the loser gif
        document.getElementById("giphy-embed").src = "https://giphy.com/embed/3oFzmko6SiknmpR2NO";
        document.getElementById("numLosses").style.color = "#ffa500";
    }

};


//event listener for key pressed
document.onkeyup = function(event) {
    //if isFinished is true then restart the game to the initial setup 
    //and switch isFinished back to false
    if (isFinished) {
        setup();
        isFinished = false;
    } else {
        //check to see if only letters A-Z are pressed
        //functions are executed when user presses A-Z key
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            checkGuess(event.key.toUpperCase()); 
            updateScreen();
            isWinner();
            isLoser();
        }
    }
};


setup();
updateScreen();

console.log(ansWord);
