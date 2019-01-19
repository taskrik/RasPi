const express = require("express");

const app = express();
const port = 3000;

const path = require("path");

const gpio = require("rpi-gpio");
const Gpio = require("onoff").Gpio
const Lcd = require('lcd');



//LCD screen
const lcd = new Lcd({rows: 2});

lcd.on('ready', () => {
  setInterval(() => {
    lcd.setCursor(0, 0);
    lcd.print("Hello world", (err) => {
      if (err) {
        throw err;
      }
    });
  }, 1000);
});
 


//setup single led
const singleLed = new Gpio(4, "out");


//setup alarm system

//buzzer
const buzzer = new Gpio(5, "out")

//leds
gpio.setup(12, gpio.DIR_OUT);
gpio.setup(16, gpio.DIR_OUT);
gpio.setup(18, gpio.DIR_OUT);


//sensor
let sensor = {
  pin: 22
};

const pirSensor = new Gpio(sensor.pin, "in", "both")


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

console.log(path.join(__dirname, "public"));

app.get("/", function(req, res) {
  res.render("index", { status: "Press Button To change Status of Led !!" });
});

//turn led on
app.post("/led/on", function(req, res) {
  
  singleLed.writeSync(1)
  return res.render("index", { status: "Cool!!Led is On" });
  });


//turn led off
app.post("/led/off", function(req, res) {
    singleLed.writeSync(0)
    return res.render("index", { status: "Ohh!! Led is Off" });
});

//turn alarm on
app.post("/alarm/on", function(req, res) {
	res.render("index", { status: "Alarm is on" });
	pirSensor.watch(function(err,value){
	if(value === 1){
		console.log("Movement detected!", value)
		gpio.write(12, true);
  		gpio.write(16, true);
  		gpio.write(18, true);
		const iv = setInterval(() => buzzer.writeSync(value),200)
  		setTimeout(() =>{ 
		clearInterval(iv)
		buzzer.writeSync(0) 
}, 1000)
	}else {
	console.log("Area is clear!")
	gpio.write(12, false);
  	gpio.write(16, false);
  	gpio.write(18, false);
	buzzer.writeSync(0)
	
} 
	})	
	

});


//turn alarm off
app.post("/alarm/off", function(req, res) {
  res.render("index", { status: "You terminated the programme" });
 
	
});

  process.on("SIGINT", function(){
    console.log("You terminated the program")
    singleLed.writeSync(0);
    gpio.write(12, false);
    gpio.write(16, false);
    gpio.write(18, false);
    lcd.close();
    pirSensor.unexport()
    buzzer.unexport()
    process.exit()

})




app.listen(port, () => console.log(`Listening to port ${port}`));
