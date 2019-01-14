const express = require("express");

const app = express();
const port = 3000;


app.get("/", (req, res) => res.send("hello there from the server"));
app.get("/next-page", (req, res) =>
  res.json({ page: "Next Page", page1: "blasd" })
);

app.listen(port, () => console.log(`Listening to port ${port}`));
