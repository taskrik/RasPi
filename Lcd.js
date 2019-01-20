
const Raspi = require('raspi-io');
const five = require("johnny-five");
const board = new five.Board({
    io: new Raspi()
  });
  
board.on("ready", function() {
  var lcd = new five.LCD({
    controller: "PCF8574A"
  });

  lcd.print("Hello there!");
   lcd.clear()

   this.repl.inject({
	lcd: lcd
	})

});