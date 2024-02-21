const Feedback = require('../models/feedback');
const Bridge = require('../models/bridge');
const User = require('../models/user');

module.exports.createFeedback = async (req, res) => {
    try {
        
        const { id } = req.params;
    const { name, comments, GUID, cameraPosition, targetPosition, lastSelection, element, dateCreated } = req.body;
    // console.log(id);
    // console.log(req.body);

    // creating a User
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
    const newFeedback = new Feedback({
        name,
        comments,
        GUID,
        cameraPosition,
        targetPosition,
        lastSelection,
        element, 
        dateCreated 
      });
    

    bridge.feedbacks.push(newFeedback);
    await bridge.save();
    await newFeedback.save();
    console.log(JSON.stringify(bridge, null, 2));

    // res.redirect(`http://localhost:5173/bridges/3d/${id}`);
    res.status(201).json({ message: 'Feedback successfully stored' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }

    
}
