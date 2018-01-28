var prompt = require('prompt');
var Word = require('./word.js');
var Game = require('./game.js');

prompt.start();

game = {
	wordBank : Game.wordBank,
	wordsWon : 0,
	guessesRemaining : 10,
	guessedLetters: [],
	currentWrd : null,
	startGame : function(wrd) {
		this.resetGuessesRemaining();
		this.currentWrd = new Word.Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
		this.currentWrd.getLets();
		console.log("Some of the happiest countries in the world!\nGuess them!");
		console.log(this.currentWrd.wordRender() + '\n');
		this.keepPromptingUser();
	},
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;
		prompt.get(['guessLetter'], function(err, result) {
				console.log("");
		    console.log('The letter you guessed is: ' + result.guessLetter);

		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

		    if (findHowManyOfUserGuess === 0) {
					if (self.guessedLetters.indexOf(result.guessLetter) < 0) {
            	self.guessedLetters.push(result.guessLetter);
            	self.guessesRemaining--;
            	console.log("Ooops, wrong letter!");
          } else {
            	console.log("You've already guessed this letter!");
          }
		    } else {
			    	if (self.guessedLetters.indexOf(result.guessLetter) < 0) {
	    				self.guessedLetters.push(result.guessLetter);
				    	console.log('You guessed right!');
				    } else {
				    	console.log('Already guessed that letter');
				    }
		    		if (self.currentWrd.didWeFindTheWord()) {
				    	console.log('You Won! The Word was' +" " +self.currentWrd.word);
							console.log('Good Job!!');
				    	return;
				    }
			    }

		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
				console.log("");
		    console.log('Letters already guessed: ' + " " + self.guessedLetters);


		    if ((self.guessesRemaining > 0) && (self.currentWrd.found === false)){
		    	self.keepPromptingUser();
		    } else if(self.guessesRemaining === 0){
			    	console.log('You lost! The word was'+ " " +self.currentWrd.word);
			    	console.log('Try again!');
			  } else{
			    	console.log(self.currentWrd.wordRender());
			  }
		});
	}
};

game.startGame();
