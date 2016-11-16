var Scrabble = function() {};

// create the hashmap
var letterScore = { "a": 1, "b": 3, "c": 3, "d": 2, "e": 1, "f": 4, "g": 2,
"h": 4, "i": 1, "j": 8, "k": 5, "l": 1, "m": 3, "n": 1, "o": 1, "p": 3,
"q": 10, "r": 1, "s": 1, "t": 1, "u": 1, "v": 4, "w": 4, "x": 8, "y": 4,
"z": 10 };

var bonus_length = 7;
var bonus = 50;

Scrabble.prototype.score = function(word) {
  this.word = word.toLowerCase(); // lowercase input for comparing

    if (word === "") {
      return 0;
    } else {
      var score = 0;
      for(var i=0; i<this.word.length; i++) {
        score += letterScore[this.word[i]];
      }

      if (this.word.length >= bonus_length) {
        score += bonus;
      }

    return score;
    }
};

Scrabble.prototype.highestScore = function(wordArr) {
  var highScore = 0;
  var highScoreWord = "";

  for(var i=0; i<wordArr.length; i++) {
    var word = wordArr[i];
    var score = this.score(word);

    if (score > highScore) {
      highScore = score;
      highScoreWord = word;
    } else if (score == highScore) {
// if the top score is tied between multiple words,
// pick the one with the fewest letters.
      if (word.length < highScoreWord.length) {
        highScoreWord = word;
      }
    } else {}
  }

  return highScoreWord;
};


var Player = function(name) {
  this.name = name;
  this.plays = [];
};

Player.prototype.play = function(word) {
  this.word = word;
  this.plays.push(word);
  // do we really have to make a new instance of scrabble every time???
  scrabble = new Scrabble();
  return scrabble.score(word);
};


var sarah = new Player("Sarah");
console.log(sarah.play("cat"));
console.log(sarah.play("dog"));
console.log(sarah.plays);
// var scrabble = new Scrabble();
// console.log(scrabble.score("cat"));
// // console.log(word._word);
//
// console.log(scrabble.highestScore(["dog","a","catssss"]));

// YOUR CODE HERE
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};

module.exports = Scrabble;
