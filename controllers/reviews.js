const Review = require('../models/review');
const Bridge = require('../models/bridge');
const User = require('../models/user');
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';


module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const { rating, name, feedback, userIp } = req.body;
    // console.log(id);
    // console.log(req.body);

    // // creating a User
    // let user = await User.findOne({ ip: userIp });
    // if (!user) {
    //     const userObject = { ip: userIp };
    //     if (name) {
    //         userObject.name = name;
    //     }
    //     user = new User(userObject);
    //     console.log("user created");
    //     await user.save();
    // }

    const bridge = await Bridge.findById(id);
    const newReview = new Review({body: feedback, rating: rating, name: name});
    // newReview.author = user._id;
    bridge.reviews.push(newReview);
    await bridge.save();
    await newReview.save();
    console.log(JSON.stringify(bridge, null, 2));
    
    res.redirect(`${frontendURL}/bridges/details/${id}`);
    // return res.status(201).json({ message: 'review successfully stored' });

    
}

// module.exports.deleteReview = async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndRemove(reviewId);
//     req.flash('success','Successfully deleted a review');
//     res.redirect(`/campgrounds/${id}`);
// }

