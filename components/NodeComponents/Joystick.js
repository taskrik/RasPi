const five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  console.log("Board ready!");

  // Create a new `joystick` hardware instance.
  const joystick = new five.Joystick(["GPIO17", "GPIO27"]);

  joystick.on("change", function() {
    console.log("Joystick");
    console.log("  x : ", this.x);
    console.log("  y : ", this.y);
    console.log("--------------------------------------");
  });
});
