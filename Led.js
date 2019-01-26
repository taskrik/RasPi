const five = require("johnny-five");
const Raspi = require("raspi-io");

const board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  const led = new five.Led(7);

  led.on();

  this.on("exit", function() {
    led.off();
  });
});
