import mongoose from "mongoose";

const usersSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    }, email:{
        type:String,
        require:true
    }, password:{
        type:String,
        require:true
    }
})
export default mongoose.model("users",usersSchema)