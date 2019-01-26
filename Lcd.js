
const Raspi = require('raspi-io');
const five = require("johnny-five");


const board = new five.Board({
    io: new Raspi()
  });
  
board.on("ready", function() {
  var lcd = new five.LCD({
    controller: "PCF8574A"
  });

  lcd.cursor(0,0).print("Hello there");
  lcd.cursor(1,3).print("Tasos!");
   

  this.on("exit", function() {
    lcd.off();
  });

});