const express = require("express");

const app = express();
const port = 3000;

const path = require("path");

const gpio = require("rpi-gpio");
//setup single led
gpio.setup(7, gpio.DIR_OUT);

//setup alarm system
//buzzer
gpio.setup(29, gpio.DIR_OUT);

//leds
gpio.setup(12, gpio.DIR_OUT);
gpio.setup(16, gpio.DIR_OUT);
gpio.setup(18, gpio.DIR_OUT);

//gpio.setMode(gpio.MODE_RPI);

//sensor
let sensor = {
  pin: 15,
  loopTime: 1500,
  tripped: false,
  value: undefined
};

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

console.log(path.join(__dirname, "public"));

app.get("/", function(req, res) {
  res.render("index", { status: "Press Button To change Status of Led !!" });
});

//turn led on
app.post("/led/on", function(req, res) {
  gpio.write(7, true, function(err) {
    if (err) throw err;
    console.log("Written True to pin");
    console.log(path.join(__dirname, "public"));
    return res.render("index", { status: "Cool!!Led is On" });
  });
});

//turn led off
app.post("/led/off", function(req, res) {
  gpio.write(7, false, function(err) {
    if (err) throw err;
    console.log("Written False to pin");
    console.log(path.join(__dirname, "public"));
    return res.render("index", { status: "Ohh!! Led is Off" });
  });
});

//turn alarm on
app.post("/alarm/on", function(req, res) {
  //setting up the sensor
  const onSetup = error => {
    if (error) console.error(error);
    return setInterval(readInterval, sensor.loopTime);
  };

  const readInterval = function() {
    gpio.read(sensor.pin, function(error, value) {
      if (value === sensor.tripped) return (sensor.tripped = value);
      if (sensor.tripped) console.log("We have movement!");
      else console.log("it's quiet... a little TOO quiet...");
    });
  };

  gpio.setup(sensor.pin, gpio.DIR_IN, onSetup);

  if (readInterval) {
    gpio.write(12, true);
    gpio.write(16, true);
    gpio.white(18, true);
    gpio.write(29, true, function(err) {
      if (err) throw err;
      return res.render("index", { status: "Alarm is on" });
    });
  }
});

//turn alarm off
app.post("/alarm/off", function(req, res) {
  gpio.write(12, false);
  gpio.write(16, false);
  gpio.white(18, false);
  gpio.write(29, false, function(err) {
    if (err) throw err;
    return res.render("index", { status: "Alarm is off" });
  });
});

app.listen(port, () => console.log(`Listening to port ${port}`));
