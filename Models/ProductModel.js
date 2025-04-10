import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
})


export default mongoose.model('Product', productSchema)