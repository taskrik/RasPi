const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;

const board = new five.Board({
  io: new Raspi()
});

board.on("ready", function () {
  console.log("Board ready!");
  
  const led = new five.Led("GPIO4");

  led.blink();

  this.on("exit", function() {
    led.off();
  });
});
