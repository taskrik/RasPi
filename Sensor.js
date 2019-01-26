const express = require("express");

const app = express();
const port = 3000;

const path = require("path");

const gpio = require("rpi-gpio");
const Gpio = require("onoff").Gpio;

//setup alarm system

//sensor
let sensor = {
  pin: 27
};

const pirSensor = new Gpio(sensor.pin, "in", "both");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

console.log(path.join(__dirname, "public"));

app.get("/", function(req, res) {
  res.render("index", { status: "Press Button To change Status of Led !!" });
});

//turn alarm on
app.post("/alarm/on", function(req, res) {
  res.render("index", { status: "Alarm is on" });
  pirSensor.watch(function(err, value) {
    if (value === 1) {
      console.log("Movement detected!", value);
    } else {
      console.log("Area is clear!");
    }
  });
});

app.listen(port, () => console.log(`Listening to port ${port}`));
