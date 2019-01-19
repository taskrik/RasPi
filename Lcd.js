const Lcd = require('lcd');



//LCD screen
const lcd = new Lcd({rows: 2, cols: 20});

lcd.on('ready', () => {
    lcd.cursor(1,0)
    lcd.print("Hello world", (err) => {
      if (err) {
        throw err;
      }
    });
  }
);

process.on('SIGINT', () => {
    lcd.close();
    process.exit();
  });