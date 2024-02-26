
const express = require('express');
const router = express.Router();
const users = require('../controllers/users');      // need to come back to this
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET || 'thisshouldbeabettersecret!';

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
  


router.route('/login')
    .post( passport.authenticate('local', { failureRedirect: `${process.env.FRONTEND_URL}/login` }), users.login);
    // .post(  users.login);

router.route('/signup')
    .post(users.signup);

router.route('/logout')
    .post(users.logout);

router.route('/otp')
    .post(authenticateJWT, users.otp);

router.route('/otpVerify')
    .post(authenticateJWT, users.otpVerify);


module.exports = router;

