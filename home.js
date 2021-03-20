const express = require("express");
const moment = require("moment");
const app = express();
require("dotenv").config();

app.set("view engine", "pug");
app.set("views", "./kais");

const checkTimeDay = (req, res, next) => {
  let checkDay = false;
  for (i = 1; i <= 5; i++) {
    if (moment().format("d") === i) {
      checkDay = true;
      break;
    }
  }
  let checkTime = false;
  for (i = 9; i <= 17; i++) {
    if (moment().format("H") === i) {
      checkTime = true;
      break;
    }
  }
  if (!checkDay && !checkTime) {
    next();
  } else {
    res
      .status(403)
      .render("error",{
          error: "We're Out Of Service in this time, we're available from monday to friday, 9am to 5pm"
      }
        
      );
  }
};

app.get("/", checkTimeDay, function (req, res) {
  res.render("home-page", {
    OurServices: "http://localhost:5000/OurServices",

    contactUs: "http://localhost:5000/Contact-us",
  });
});

app.get("/Contact-us", checkTimeDay, function (req, res) {
  res.render("ContactUs", {
    OurServices: "http://localhost:5000/OurServices",
    home: "http://localhost:5000",
  });
});

app.get("/OurServices", checkTimeDay, function (req, res) {
  res.render("OurServices", {
    contactUs: "http://localhost:5000/Contact-us",
    home: "http://localhost:5000",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`listening on http://localhost:${port}`);
});
