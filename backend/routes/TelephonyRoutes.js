const express = require("express");
const router = express.Router();

const {receiveCall} = require("../controllers/telephonyControllers");


router.post("/incoming",receiveCall);

module.exports=router;