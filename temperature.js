var five = require('johnny-five');

var board = new five.Board();

function thermometer_to_celsius(raw) {
  // adapted from Adafruit_CircuitPlayground.cpp
  
  var SERIESRESISTOR = 10000;
  var THERMISTORNOMINAL = 10000;
  var TEMPERATURENOMINAL = 25;
  var BCOEFFICIENT = 3950;

  var reading = ((1023.0 * SERIESRESISTOR) / raw);
  reading -= SERIESRESISTOR;

  var steinhart = reading / THERMISTORNOMINAL;      // (R/Ro)
  steinhart = Math.log(steinhart);                  // ln(R/Ro)
  steinhart /= BCOEFFICIENT;                        // 1/B * ln(R/Ro)
  steinhart += 1.0 / (TEMPERATURENOMINAL + 273.15); // + (1/To)
  steinhart = 1.0 / steinhart;                      // Invert
  steinhart -= 273.15;                              // convert to C

  return steinhart;
}

board.on('ready', function() {

  var temperature = new five.Thermometer({
    pin: 'A0',
    freq: 1000,
    toCelsius: thermometer_to_celsius
  });

  temperature.on('data', function() {
    console.log('fahrenheit: ' + this.F);
    console.log('celsius: ' + this.C);
  });

});
