require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = 5050;

const app = express();
app.use(express.json());

// middleWare
const sessionMiddleware = require("./middleware/sessionMiddleware");
app.use(sessionMiddleware);

//TelephonyRoutes
const TelephonyRoutes = require("./routes/telephonyRoutes");
app.use("/telephony",TelephonyRoutes);


app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is running..."
    })
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT} `)
})