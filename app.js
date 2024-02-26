if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
// change this later on , so db url should come first
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/bridgesNew";
const bridgeRoutes = require("./routes/bridges");
const reviewRoutes = require("./routes/reviews");
const surveyRoutes = require("./routes/surveys");
const feedbackRoutes = require("./routes/feedbacks");
const userRoutes = require("./routes/users");
// authentication
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const MongoStore = require("connect-mongo");

//sanitize
const mongoSanitize = require("express-mongo-sanitize");

// import cors from 'cors';
const cors = require("cors");

//to permit cors
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//   })
// );
// app.use(cors({Origin: '*'}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS", 
    credentials: true,
  })
);

//Middleware to parse req body, JSON Data
app.use(express.json());
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  })
);

//to parse URL-encoded data(e.g., data coming from an HTML form using the POST method), the req.body which is required to update a database
app.use(express.urlencoded({ extended: true }));

//authentication and sessions
const secret = process.env.SECRET || "thisshouldbeabettersecret!";
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60, //lazy update session, we save after this time
  crypto: {
    secret: secret,
  },
});
store.on("error", function (e) {
  console.log("Session store error", e);
});
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,

  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // secure: true
  },
  phoneNumber: null, // Initialize to null or any default value
  otp: null, // Initialize to null or any default value
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// to make the current user available at all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  next();
});

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
app.use("/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
