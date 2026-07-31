const express = require("express");
const router = express.Router();

const {ReceivedCall} = require("../controllers/TelephonyControllers");


router.get("/call",ReceivedCall);

module.exports=router;