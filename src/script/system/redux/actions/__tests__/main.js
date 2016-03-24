var stream = getSomeReadableStream(); // Create read stream 
var LineTransform = require('node-line-reader').LineTransform;  // LineTransform constructor 
var LineFilter = require('node-line-reader').LineFilter;  // LineFilter constructor 
 
var transform = new LineTransform();
 
// Skip empty lines and lines with "et" (with leading and trailing space) in them 
var filter = new LineFilter({ skipEmpty: true, exclude: [/\bet\b/ });

var words = [];
 
filter.on('data', function(line) {
  words.add(line);
});
 
filter.on('end', function() {

});

var wordList = {};

function process(words) {
  for (let word of words) {
    var hash = hash(word);

    
  }
}

function hash(word) {
  // input: baa
  // sort: aab
  // number representation: 001

  var sorted = word.sort();
  for (let char of sorted) {
    let code = charCodeAt(char);


  }
}