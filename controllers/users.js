const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt-nodejs")
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET || 'thisshouldbeabettersecret!';


module.exports.login = async (req, res, next) => {
  res.status(200).json({
    message: "ok",
    username: req.user,
  });
  const { username, password } = req.body;
  
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

    res.redirect(`${process.env.FRONTEND_URL}/about`);
  });
};

module.exports.otp = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  req.session.phoneNumber = phoneNumber;
  req.session.otp = otp;
  console.log("otp generated", req.session.otp);
  console.log("phone number", req.session.phoneNumber);

  try {
     // Check if the citizen with the given phoneNumber already exists
  let citizen = await Citizen.findOne({ phoneNumber });

  // If the citizen doesn't exist, create a new one
  if (!citizen) {
    citizen = await Citizen.create({ phoneNumber });
  }

  res.status(200).json({phone: req.session.phoneNumber , otp: req.session.otp} );
  }
  catch(error)  {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send OTP' });
    };

  // client.messages
  // .create({
  //   body: `Donnersbergerbrücke: Your OTP for verification: ${otp}`,
  //   from: twilioNumber,
  //   to: phoneNumber,
  // })
  // .then(() => {
    
  //   res.json({ success: true });
  // })
  // .catch((error) => {
  //   console.error(error);
  //   res.status(500).json({ success: false, error: 'Failed to send OTP' });
  // });
};

module.exports.otpVerify = (req, res) => {
  const { phoneNumber, otp } = req.body;
  const userEnteredOtp = parseInt(otp);


  // Fetch the stored OTP associated with the phoneNumber
  const storedOtp = req.session.otp;
  console.log("user enterd otp",userEnteredOtp, " stored otp", storedOtp, "session", req.session);
  console.log(otp === storedOtp)
  if (userEnteredOtp && storedOtp && userEnteredOtp === storedOtp) {
    
    const token = jwt.sign({ phoneNumber: req.session.phoneNumber }, secretKey);
    req.session.isAuthenticated = true;
    req.session.token = token;
    // Clear the stored OTP after successful verification
    console.log("token generated", token);
    

    res.json({ success: true , token});
  } else {
    res.json({ success: false });
  }
};



