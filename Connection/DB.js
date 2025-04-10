import mongoose from "mongoose";

export const ConnectDB=async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("The Database is Connected Succesfully 👍")
    } catch (error) {

        console.log("The Database is Not Connected 😔")
        
    }
}