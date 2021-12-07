const express = require("express");
// const bodyParser = require("body-parser");
const userRoute = require("./routes/user.routes.ts");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
//router is connectionConfig
app.use("/api/user", userRoute);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

const db = require("./models");

db.sequelize.sync();

// simple route
app.get("/", (req: any, res: any) => {
  res.json({ message: "Welcome to ipage application." });
});

app;

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
