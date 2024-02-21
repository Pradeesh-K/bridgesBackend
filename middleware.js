const ExpressError = require('./utils/ExpressError');

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; // add this line
        return res.redirect(`${process.env.FRONTEND_URL}\${login}`);
    }
    next();
}
