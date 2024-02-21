const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt-nodejs")

module.exports.login = async (req, res, next) => {
  res.status(200).json({
    message: "ok",
    username: req.user,
  });
  const { username, password } = req.body;
  
//   try {   
//     console.log(req.body);
//     // const allUsers = await User.find();
//     // allUsers.forEach(user => {
//     //   // console.log(user.username);
//     // });
//     const user = await User.findOne({ username });
//     console.log(user);
//     // if(user )


//   //   const user = await User.findOne({ username });
//   // if (!user) {
//   //   return res.status(200).json({ message: 'User not found' });
//   // }
  
  
//   //   console.log(user.hash);
//   // const passwordMatch = await bcrypt.compare(password, user.hash);
//   // if (passwordMatch) {
//   //   console.log("reached")
//   //   // Passwords match, authentication successful
//   //   return res.status(200).send({
//   //     message: 'Login successful',
//   //     username: user.username,
//   //   });
//   // } else {
//   //   console.log("reac")
//   //   // Passwords do not match, authentication failed
//   //   return res.status(200).send({ message: 'Invalid password' });
//   // }

//   }

// catch (e) {
//   return res.status(404).send({ message: 'error' });
// }

};

module.exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    // await newUser.save();
    req.login(registeredUser, (err) => {
      if (err) {
        res.status(500).json({
          message: "fail",
          username: "John Doe",
          redirectUrl: `${process.env.FRONTEND_URL}/signup`,
        });
      } else {
        res.redirect(process.env.FRONTEND_URL)
        // res.status(200).json({
        //   message: "ok",
        //   username: username,
        //   redirectUrl: process.env.FRONTEND_URL,
        // });
      }
    });
  } catch (e) {
    res.redirect(`${process.env.FRONTEND_URL}/signup`);
  }
};

module.exports.logout = (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect(process.env.FRONTEND_URL);
  });
};
