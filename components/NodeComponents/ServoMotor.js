const five = require("johnny-five");
const Raspi = require("raspi-io");

const board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  const servo = new five.Servo({ pin: "GPIO18", center: true });

  // Sweep from 0-180 and repeat.
  servo.sweep();

  //   // Clockwise, top speed.
  //   servo.cw(1);
});
