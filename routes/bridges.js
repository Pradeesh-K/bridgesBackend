const express = require("express");
const router = express.Router();
// const catchAsync = require("../utils/catchAsync"); // to do this afterwards
const bridges = require("../controllers/bridges");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretKey = process.env.SECRET || 'thisshouldbeabettersecret!';
const Citizen = require("../models/citizen")

const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
  
      
      if (decoded.phoneNumber === req.session.phoneNumber) {
        
        req.phoneNumber = decoded.phoneNumber;
        next();
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
  





router
  .route("/")
  .get(bridges.index);

router
.route("/:id")
.get(bridges.showBridge)
.put(authenticateJWT,  bridges.editBridge);

module.exports = router;        // missed this so got the TypeError: Router.use() requires a middleware function but got a Object


