if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
// change this later on , so db url should come first
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/bridgesNew" ;
const bridgeRoutes = require("./routes/bridges");
const reviewRoutes = require("./routes/reviews");
const surveyRoutes = require('./routes/surveys');
const feedbackRoutes = require('./routes/feedbacks');

//sanitize
const mongoSanitize = require('express-mongo-sanitize');

// import cors from 'cors';
const cors = require("cors");
//to permit cors
app.use(cors());

//Middleware to parse req body, JSON Data
app.use(express.json());
app.use(mongoSanitize({
  onSanitize: ({ req, key }) => {
    console.warn(`This request[${key}] is sanitized`, req);
  },
}),);


//to parse URL-encoded data(e.g., data coming from an HTML form using the POST method), the req.body which is required to update a database
app.use(express.urlencoded({ extended: true }));

//Connecting Database
mongoose
  .connect(dbUrl) //27017 is the standard port number for mongoDB if db doesn't exist it is created
  .then(() => {
    console.log("Mongo connection open");
  })
  .catch((err) => {
    console.log("Oh no, Mongo express error");
    console.log(err);
  });

//a home route
app.get("/", (req, res) => {
  res.send("Backend for Bridge website up and running");
});


app.use("/bridges", bridgeRoutes);
app.use("/bridges/:id/reviews", reviewRoutes);
app.use("/survey", surveyRoutes);
app.use("/bridges/:id/feedback", feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
