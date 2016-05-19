var pixel = require('node-pixel');
var five = require('johnny-five');
var chroma = require('chroma-js');

var board = new five.Board();
var strip = null;

board.on('ready', function() {

  console.log('type `off()` to stop cycle and turn off lights');

  strip = new pixel.Strip({
    board: this,
    controller: 'FIRMATA',
    strips: [ {pin: 17, length: 10} ]
  });

  var loop;
  strip.on('ready', function() {
    var scale = chroma.scale(['red','blue']).domain([0,9]);

    var current_colors = [0,1,2,3,4,5,6,7,8,9];
    var current_pos = [0,1,2,3,4,5,6,7,8,9];
    loop = setInterval(function(){

      strip.color('#000');

      var length = strip.stripLength();

      for (var i=0; i<length; i++) {
        if (++current_pos[i] >= length) {
          current_pos[i] = 0;
          if (++current_colors[i] >= length) current_colors[i] = 0;
        }

        var color = scale(current_colors[i]).get('hex');
        strip.pixel(current_pos[i]).color(color);
      }

      strip.show();

    },300);


  });

  this.repl.inject({
    off: function(){
      clearInterval(loop);
      strip.color('#000');
      strip.show();
    }
  });

});
