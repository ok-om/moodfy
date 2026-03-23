const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors")
const app = express();
const path = require("path");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
     credentials: true
}))
app.use(express.static(path.join(__dirname,"../Public")));


const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth",authRoutes)
app.use("/api/songs", songRoutes)


app.get(/.*/,(req,res)=>{
   res.sendFile(path.join(__dirname,"../Public","index.html"))
})

module.exports = app
