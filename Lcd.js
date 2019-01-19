const Lcd = require("lcd");

//LCD screen
const lcd = new Lcd({ rows: 2, cols: 20 });

lcd.on("ready", () => {
  lcd.cursor(0, 0);
  lcd.print("Hello world");
});

process.on("SIGINT", () => {
  lcd.close();
  process.exit();
});
