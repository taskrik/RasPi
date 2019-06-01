const five = require("johnny-five");


const board = new five.Board()

board.on("ready", function() {
  const led = new five.Led({
    pin: "GPIO17"
  });

  led.on();

  this.on("exit", function() {
    led.off();
  });
});
