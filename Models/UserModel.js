import mongoose from "mongoose";

const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    userId:{
        type:String,
        unique:true
    }

})

export default mongoose.model('User',userSchema);