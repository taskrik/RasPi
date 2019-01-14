const express = require("express");

const app = express();
const port = 3000;

const gpio = require('rpi-gpio');
gpio.setup(7,gpio.DIR_OUT)


app.get("/", (req, res) => res.send("hello there from the server"));
app.get("/next-page", (req, res) =>
  res.json({ page: "Next Page", page1: "blasd" })
);

app.post('/led/on', function(req, res){
    gpio.write(7, true, function(err) {
            if (err) throw err;
            console.log('Written True to pin');
        console.log(path.join(__dirname, 'public'));
        return res.render('index', {status: "Cool!!Led is On"});
        });
    
    });

app.listen(port, () => console.log(`Listening to port ${port}`));
