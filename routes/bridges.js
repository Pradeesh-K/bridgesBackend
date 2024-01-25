const express = require("express");
const router = express.Router();
// const catchAsync = require("../utils/catchAsync"); // to do this afterwards
const bridges = require("../controllers/bridges");

router
  .route("/")
  .get(bridges.index);

router
.route("/:id")
.get(bridges.showBridge)
.put(bridges.editBridge);

module.exports = router;        // missed this so got the TypeError: Router.use() requires a middleware function but got a Object


