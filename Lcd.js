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

process.on('SIGINT', () => {
    lcd.close();
    process.exit();
  });