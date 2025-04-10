import mongoose, { mongo } from "mongoose";

const wishlistSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[{type:String}]
})

export default mongoose.model('Wishlist',wishlistSchema)