const router = require("express").Router();

const userRoute = require("./user");
const todoRoute = require("./todo");

router.use("/user", userRoute);
router.use("/todo", todoRoute);

module.exports = router;
