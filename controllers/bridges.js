const Bridge = require("../models/bridge"); // Import your Bridge model

module.exports.index = async (req, res) => {
  const bridges = await Bridge.find({});
  console.log("Frontend URL:", process.env.FRONTEND_URL);
  res.status(200).send(bridges);
};

module.exports.showBridge = async (req, res) => {
  const { id } = req.params;
  const bridge = await Bridge.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("feedbacks");
  // there's no review yet and thus nothing to populate

  if (!bridge) {
    return res.status(404).send({ message: "Error ! Can't find that bridge" });
  } else {
    res.status(200).send(bridge);
  }
};

module.exports.editBridge = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  console.log(id);
  try {
    const bridge = await Bridge.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!bridge) {
      return res.status(404).json({ message: "Bridge not found" });
    }
    await bridge.save();
    return res.status(200).json(bridge);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
