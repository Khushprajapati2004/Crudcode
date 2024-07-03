const express = require("express");
const app = express();
const db = require("./db");


const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server on");
});




// Import the router files.
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use person routes
app.use('/person', personRoutes);
app.use('/menuitem', menuRoutes);

app.listen(4000, () => {
  console.log("listening on port 4000");
});
