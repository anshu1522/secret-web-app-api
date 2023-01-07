const routes = require("./routes");
const express = require("express");

const mongoose = require("mongoose");
const User = require("./models");
mongoose.connect(
  "mongodb+srv://anshu:123456anshu@cluster0.8zkogz0.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DB connected");
});
const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use("/api",routes);
app.get("/message/:id", async(req, res, next) => {
    console.log(req.params.id)
    let message;
    try {
        message = await User.findOne({_id:req.params.id}).select('-updatedAt -__v');
    } catch (error) {
        console.log(error)
    }
    res.json(message);
 
});

app.put("/message/:id", async(req, res, next) => {
    console.log(req.params.id)
    const msg=req.body.msg
    console.log(req.body);
    let message;
    try {
        message = await User.findByIdAndUpdate({_id:req.params.id},{$push:{"message":msg}},{new:true});
    } catch (error) {
        console.log(error)
    }
    res.json(message);
 
});
app.post("/link", async (req, res) => {
  console.log(req.body);
  if (req.body.name) {
    const user = new User({
      name: req.body.name,
      message: [],
    });
    let result;
    try {
       result = await user.save();
    
    } catch (error) {
     console.log(error)
    }
    res.json({ result });
  }
});

app.listen(8000, () => {
  console.log("server");
});
