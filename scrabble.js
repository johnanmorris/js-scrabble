var Scrabble = function() {

};

var letters = {
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
    for (var letter in letters) {
      if (letter == userWord[i]) {
        score += letters[letter];
      }
    }
  }
  return score;
};

Scrabble.highestScoreFrom = function(arrayOfWords) {
  var scoring = {};
  var maxWords = [];

  for(var i = 0; i < arrayOfWords.length; i++) {
    wordScore = Scrabble.score(arrayOfWords[i]);
    Object.defineProperty(scoring, arrayOfWords[i], {value: wordScore, enumerable: true});
  }
  console.log(scoring);
  var values = Object.values(scoring).sort();
};

module.exports = Scrabble;



Scrabble.score("hello");
// console.log(Scrabble.score("hello")); // 8

Scrabble.score("aaaaaaa");
// console.log(Scrabble.score("aaaaaaa")); // 57

var scores = Scrabble.highestScoreFrom(["hello", "aaaaaaa"]);

//     max_val = scoring_hash.values.max
//     scoring_hash.each do |key, value|
//       if value == max_val
//         max_words << key
//       end
//     end
//
//     max_words.sort_by! {|word| word.length}
//
//     if max_words.last.length == 7
//       return max_words.last
//     else
//       return max_words.first
//     end
//   end
// end
