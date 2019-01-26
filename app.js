const express = require("express");
const five = require("johnny-five");
const Raspi = require("raspi-io");

const board = new five.Board({
  io: new Raspi()
});

const app = express();
const port = 3000;

const path = require("path");

// //setup alarm system

// //buzzer
// const buzzer = new Gpio(5, "out")

// //leds
// gpio.setup(12, gpio.DIR_OUT);
// gpio.setup(16, gpio.DIR_OUT);
// gpio.setup(18, gpio.DIR_OUT);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

console.log(path.join(__dirname, "public"));

app.get("/", function(req, res) {
  res.render("index", { status: "Press Button To change Status of Led !!" });
});

board.on("ready", function() {
  const led = new five.Led(7);
  const motion = new five.Motion(13, {
    controller: "PIR"
  });

  //turn led on
  app.post("/led/on", function(req, res) {
    led.on();
    console.log("led is on");

    return res.render("index", { status: "Cool!!Led is On" });
  });

  //turn led off
  app.post("/led/off", function(req, res) {
    led.off();
    console.log("led is off");

    return res.render("index", { status: "Ohh!! Led is Off" });
  });

  //turn alarm on
  //   app.post("/alarm/on", function(req, res) {
  //     res.render("index", { status: "Alarm is on" });
  motion.on("calibrated", function() {
    console.log("calibrated");
  });
  motion.on("motionstart", function() {
    console.log("motionstart");
  });

  motion.on("motionend", function() {
    console.log("motionend");
  });

  this.on("exit", function() {
    led.off();
  });
});

// this.on("exit", function() {
//   led.off();
// });
// });

// //turn alarm off
// app.post("/alarm/off", function(req, res) {
//   res.render("index", { status: "You terminated the programme" });

// });

//   process.on("SIGINT", function(){
//     console.log("You terminated the program")
//     singleLed.writeSync(0);
//     gpio.write(12, false);
//     gpio.write(16, false);
//     gpio.write(18, false);
//     pirSensor.unexport()
//     buzzer.unexport()
//     process.exit()

// })

app.listen(port, () => console.log(`Listening to port ${port}`));
