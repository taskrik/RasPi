const Lcd = require('lcd');



//LCD screen
const lcd = new Lcd({rows: 1});

lcd.on('ready', () => {
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