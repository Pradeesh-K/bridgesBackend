const express = require("express");
const router = express.Router();
// const catchAsync = require("../utils/catchAsync"); // to do this afterwards
const bridges = require("../controllers/bridges");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretKey = process.env.SECRET || 'thisshouldbeabettersecret!';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey, // Replace with your actual secret key
};

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  // Here you can query your database to find the user based on the decoded JWT payload

}));

// Middleware to protect the route with passport
const requireAuth = passport.authenticate('jwt', { session: false });




router
  .route("/")
  .get(bridges.index);

router
.route("/:id")
.get(bridges.showBridge)
.put(requireAuth, bridges.editBridge);

module.exports = router;        // missed this so got the TypeError: Router.use() requires a middleware function but got a Object


