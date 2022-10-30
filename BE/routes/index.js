const express = require("express");
const router = express.Router();
const Demo = require("./routes");

router.use("/demo", Demo);

module.exports = router;
