const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
  console.log("Board ready!");

  // Create a new `joystick` hardware instance.
  const joystick = new five.Joystick({
    // [ x, y ]
    pins: ["A0", "A1"]
  });

  joystick.on("change", function() {
    console.log("  x : ", this.x);
    console.log("  y : ", this.y);
    console.log("--------------------------------------");
  });
});
