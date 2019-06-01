const five = require("johnny-five");
const Raspi = require("raspi-io");
var board = new five.Board();

board.on("ready", function() {
  console.log("Board ready!");

  // Create a new `joystick` hardware instance.
  const joystick = new five.Joystick({
    //   [ x, y ]
    pins: [11, 13]
  });

  joystick.on("change", function() {
    console.log("Joystick");
    console.log("  x : ", this.x);
    console.log("  y : ", this.y);
    console.log("--------------------------------------");
  });
});
