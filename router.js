const router = require("express").Router()

const {value} = require("./opt")
const {value1} = require("./opt1")



router.post("/", value);
router.post("/arith", value1)


module.exports = {router}