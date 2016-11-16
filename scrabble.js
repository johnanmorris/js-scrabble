/* SCRABBLE */

var Scrabble = function() {

};

var LETTERS = {
  A: 1, B: 3, C: 3,
  D: 2, E: 1, F: 4,
  G: 2, H: 4, I: 1,
  J: 8, K: 5, L: 1,
  M: 3, N: 1, O: 1,
  P: 3, Q: 10, R: 1,
  S: 1, T: 1, U: 1,
  V: 4, W: 4, X: 8,
  Y: 4, Z: 10
};

Scrabble.score = function(word) {
  var score = 0;
  var userWord = word.toUpperCase();

  if (userWord.length == 7) {
    score += 50;
  }

  for (var i = 0; i < userWord.length; i++) {
    for (var letter in LETTERS) {
      if (letter == userWord[i]) {
        score += LETTERS[letter];
      }
    }
  }
  return score;
};

Scrabble.highestScoreFrom = function(arrayOfWords) {
  var highestWord = arrayOfWords[0];

  // start at 1 because the array at index [0] is already set as highestWord
  for(var i = 1; i < arrayOfWords.length; i++) {
    if (isHigherScore(highestWord, arrayOfWords[i])) {
      highestWord = arrayOfWords[i];
    }
  }
  return highestWord;
};

// This is an extra function I've written, which:
// 1. Does the actual scoring (scoreOne and scoreTwo);
// 2. Compares the numerical value and returns true if the second word
//    a) has the numerically higher score,
//    b) uses all seven letters, or
//    c) is shorter than the first word; and
// 3. Deals with the final tie-breaker, whether the word appears first
//    in the list, by the final else returning false. This function is
//    used in highestScoreFrom in conjunction with the variable
//    highestWord, which always stores the *first* word with the highest
//    score.
// I suppose I could have included it in the function above, but it
// seemed cleaner to separate it.

var isHigherScore = function(wordOne, wordTwo) {
  var scoreOne = Scrabble.score(wordOne);
  var scoreTwo = Scrabble.score(wordTwo);

  if (scoreOne > scoreTwo) {
    return false;
  }
  else if (scoreTwo > scoreOne ) {
    return true;
  }

  else if (scoreTwo === scoreOne) {
    if (wordOne.length === 7 && wordTwo.length < 7) {
      return false;
    } else if (wordTwo.length === 7 && wordOne.length < 7) {
      return true;
    } else if (wordOne.length < wordTwo.length) {
      return false;
    } else if (wordTwo.length < wordOne.length) {
      return true;
    } else {
      return false;
    }
  }
};

/* PLAYER */

var Player = function(player) {
  this.name = player;
  this.plays = [];
};

Player.prototype.play = function(word) {
  var score = this.totalScore();
  if (score >= 100) {
    return false;
  } else {
    this.plays.push(word);
    return true;
  }
};

Player.prototype.totalScore = function() {
  var score = 0;
  for(var i=0; i < this.plays.length; i++) {
    score += Scrabble.score(this.plays[i]);
  }
  return score;
};

Player.prototype.hasWon = function () {
  var score = this.totalScore();
  if (score >= 100) {
    return true;
  } else {
    return false;
  }
};

Player.prototype.highestScoringWord = function() {
  var highestWord = Scrabble.highestScoreFrom(this.plays);
  return highestWord;
};

Player.prototype.highestWordScore = function() {
  var highestWord = this.highestScoringWord();
  return Scrabble.score(highestWord);
};

/* TILEBAG */

var TileBag = function() {
  this.tiles = {
    A: 9, B: 2, C: 2,
    D: 4, E: 12, F: 2,
    G: 3, H: 2, I: 9,
    J: 1, K: 1, L: 4,
    M: 2, N: 6, O: 8,
    P: 2, Q: 1, R: 6,
    S: 4, T: 6, U: 4,
    V: 2, W: 2, X: 1,
    Y: 2, Z: 1
  };
};

TileBag.prototype.draw = function(num) {
  var available = Object.keys(this.tiles);
  var selection = [];

  if (num > this.tilesRemaining()) {
    num = this.tilesRemaining();
  }

  while (selection.length < num) {
    var tile = available[Math.floor(Math.random() * available.length)];
    if (this.tiles[tile] > 0) {
      selection.push(tile);
      this.tiles[tile] -= 1;
    }
  }
  return selection;
};

TileBag.prototype.tilesRemaining = function() {
  var total = 0;
  var tileCount = Object.values(this.tiles);
  for (var i = 0; i < tileCount.length; i++) {
    total += tileCount[i];
  }
  return total;
};

/* MANUAL TESTS */

noelle = new Player("Noelle");
console.log("Player.name: " + noelle.name);
noelle.play("zzzzzx");
noelle.play("cat");
noelle.play("staring");
console.log(" ");
console.log("Score of zzzzzzx: " + Scrabble.score("zzzzzx"));
console.log("Score of cat: " + Scrabble.score("cat"));
console.log("Score of staring: " + Scrabble.score("staring"));
console.log(" ");
console.log("Plays: " + noelle.plays);
console.log("Total score: " + noelle.totalScore());
console.log("noelle.highestScoringWord: " + noelle.highestScoringWord());
console.log(" ");
console.log("Noelle won?: " + noelle.hasWon());
console.log("Can play another word after win?: " + noelle.play("apple"));
console.log("Plays after attempting to play another word: " + noelle.plays);
console.log("Score of highest scoring word, " + noelle.highestScoringWord() + ": " + noelle.highestWordScore());
console.log(" ");
myTilebag = new TileBag();
console.log("Draw 8 from tilebag: " + myTilebag.draw(8));
console.log("Tile count: " + myTilebag.tilesRemaining());
console.log("Draw 20 from tilebag: " + myTilebag.draw(20));
console.log("Tile count: " + myTilebag.tilesRemaining());
console.log("Draw 20 from tilebag: " + myTilebag.draw(20));
console.log("Tile count: " + myTilebag.tilesRemaining());
console.log("Draw 20 from tilebag: " + myTilebag.draw(20));
console.log("Tile count: " + myTilebag.tilesRemaining());
console.log("Draw 20 from tilebag: " + myTilebag.draw(20));
console.log("Tile count: " + myTilebag.tilesRemaining());
console.log("Draw 9 from tilebag: " + myTilebag.draw(9));
console.log("Tile count: " + myTilebag.tilesRemaining());
console.log("Attempting to draw 2 from tilebag, should draw 1: " + myTilebag.draw(2));
console.log("Tile count: " + myTilebag.tilesRemaining());

module.exports = Scrabble;
