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
  //setup Led/Leds
  const led = new five.Led({
    pin: "GPIO17"
  });

  //setup PIR sensor
  const motion = new five.Motion(7);

  //setup LCD screen
  const lcd = new five.LCD({
    controller: "PCF8574A"
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
  app.post("/alarm/on", function(req, res) {
    res.render("index", { status: "Alarm is on" });

    //count times alarm was triggered
    let count = 0;

    motion.on("calibrated", function() {
      console.log("Sensor is Ready");
    });

    motion.on("motionstart", function() {
      count++;
      console.log("There was movement");
      console.log("count:", count);
      led.blink();
      lcd.cursor(0, 0).print("Alarm triggered");
      lcd.cursor(1, 0).print(`${count} times`);
    });

    motion.on("motionend", function() {
      console.log("All Clear");
      led.stop().off();
    });
  });

  this.on("exit", function() {
    led.off();
    lcd.off();
  });
});

app.listen(port, () => console.log(`Listening to port ${port}`));
