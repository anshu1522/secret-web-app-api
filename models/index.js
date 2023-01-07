const mongoose= require("mongoose");
const {Schema} =mongoose;
const userSchema= new Schema({
    name:{type:String,required:true},
    message: [mongoose.Schema.Types.Mixed]
},{timestamps:true})
module.exports=mongoose.model("User",userSchema,"users")