var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function() {

  var piezo = new five.Piezo(5);

  // https://github.com/julianduque/j5-songs/blob/master/lib/songs/mario-fanfare.js
  piezo.play({
    song: [
      ['C5', 1/4],
      [null, 5/4],
      ['G4', 1/4],
      [null, 5/4],
      ['E4', 1/4],
      [null, 5/4],
      ['A4', 1/4],
      [null, 1/4],
      ['B4', 1/4],
      [null, 3/4],
      ['A#4', 1/4],
      [null, 1/4],
      ['A4', 1/4],
      [null, 3/4],
      ['G4', 1/4],
      [null, 1/4],
      ['E5', 1/4],
      [null, 3/4],
      ['G5', 1/4],
      [null, 1/4],
      ['A5', 1/4],
      [null, 3/4],
      ['F5', 1/4],
      [null, 1/4],
      ['G5', 1/4],
      [null, 3/4],
      ['E5', 1/4],
      [null, 3/4],
      ['C5', 1/4],
      [null, 1/4],
      ['D5', 1/4],
      [null, 1/4],
      ['B4', 1/4],
      [null, 3/4]
    ],
    tempo: 200
  },function(){
    process.exit();
  });

});
