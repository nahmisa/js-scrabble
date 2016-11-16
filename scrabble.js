var Scrabble = function() {
  // create the hashmap
  this.letterScore = { "a": 1, "b": 3, "c": 3, "d": 2, "e": 1, "f": 4, "g": 2,
  "h": 4, "i": 1, "j": 8, "k": 5, "l": 1, "m": 3, "n": 1, "o": 1, "p": 3,
  "q": 10, "r": 1, "s": 1, "t": 1, "u": 1, "v": 4, "w": 4, "x": 8, "y": 4,
  "z": 10 };

  this.maxLength = 7;
  this.bonus = 50;
  this.tileBag = new TileBag();
};

var TileBag = function() {
  this.defaultTiles = ["a", "a", "a", "a", "a", "a", "a", "a",
        "a", "n", "n", "n", "n", "n", "n", "b", "b", "o", "o", "o", "o", "o",
        "o", "o", "o", "c", "c", "p", "p", "d", "d", "d", "d", "q", "e", "e",
        "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "r", "r", "r", "r",
        "r", "r", "f", "f", "s", "s", "s", "s", "g", "g", "g", "t", "t", "t",
        "t", "t", "t", "h", "h", "u", "u", "u", "u", "i", "i", "i", "i", "i",
        "i", "i", "i", "i", "v", "v", "j", "w", "w", "k", "x", "l", "l", "l",
        "l", "y", "y", "m", "m", "z"];
};

TileBag.prototype.drawTiles = function(numOfTiles) {
  this.randomTiles = [];
  for(var i=0; i<numOfTiles; i++) {
  // tiles are formatted like: [number, original index]
    var tile = sample(this.defaultTiles);
  // get random tiles from the bag
    this.randomTiles.push(tile);
  // remove those tiles from the bag so they cannot be drawn again
  // the index 1 of tile is the random index that cause it to be drawn...
  // this is the index in defaultTiles
    this.defaultTiles.splice(tile[1],1);
  }
  return this.randomTiles;

};

// helper function to wrap ugly random
function sample(array) {
  var index = Math.floor ( Math.random() * array.length );
  return [array[index], index];
}

Scrabble.prototype.score = function(word) {
  this.word = word.toLowerCase(); // lowercase input for comparing

    if (word === "") {
      return 0;
    } else {
      var score = 0;
      for(var i=0; i<this.word.length; i++) {
        score += this.letterScore[this.word[i]];
      }

      if (this.word.length >= this.maxLength) {
        score += this.bonus;
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

// pass two arguments, name & game3 so that we can have multiplayer games
var Player = function(name, game = (new Scrabble())) {
  this.name = name;
  this.plays = [];
  // Each player will have their own Scrabble
  this.scrabble = game;
  // a new player has the maximum number of tiles available to them
  this.tiles = this.scrabble.tileBag.drawTiles(this.scrabble.maxLength);
};

Player.prototype.play = function(word) {
  if(this.hasWon()) {
    return false;
  }
  this.word = word;
  this.plays.push(word);

  this.removeTiles(word);
  this.drawTiles(word);

  return this.scrabble.score(word);
};

Player.prototype.removeTiles = function(word) {
  this.word = word;
  for(var i=0; i<this.word; i++) {
    var letter = word[i];
  // remove those tiles from the player's tiles so they cannot be played again
  // I think we will have to loop through all the player's tiles to find
  // the one that matches a partiular letter.
  // This is less than ideal, but because things keep getting reshuffled and
  // we don't have any information from the letter about where it is in the arr.
  // this is an okay solution for now :(
    for(var j=0; j<this.tiles.length; j++) {
      if (letter == this.tiles[j][0]) {
        this.tiles.splice(j,1);
        break;
      }
    }
  }
  return this.tiles;
};

Player.prototype.drawTiles = function() {
  var tilesDrawn = this.scrabble.tileBag.drawTiles(this.scrabble.maxLength - this.tiles.length);
  for(var i=0; i<tilesDrawn; i++) {
    this.tiles.push(tilesDrawn[i]);
  }
  return this.tiles;
};

Player.prototype.totalScore = function() {
  if (this.plays == []){
    return 0;
  }
  var total = 0;
  for(var i=0; i<this.plays.length; i++) {
    total += this.scrabble.score(this.plays[i]);
  }
  return total;
};

Player.prototype.hasWon = function() {
  if (this.totalScore() > 100) {
    return true;
  } else {
    return false;
  }
};

Player.prototype.highestScoringWord = function() {
  return this.scrabble.highestScore(this.plays);
};

Player.prototype.highestWordScore = function() {
  return this.scrabble.score(this.highestScoringWord());
};

module.exports = Scrabble;
