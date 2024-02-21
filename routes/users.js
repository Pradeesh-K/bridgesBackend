
const express = require('express');
const router = express.Router();
const users = require('../controllers/users');      // need to come back to this
const passport = require('passport');


router.route('/login')
    .post( passport.authenticate('local', { failureRedirect: `${process.env.FRONTEND_URL}/login` }), users.login);
    // .post(  users.login);

router.route('/signup')
    .post(users.signup);

router.route('/logout')
    .post(users.logout);

module.exports = router;

