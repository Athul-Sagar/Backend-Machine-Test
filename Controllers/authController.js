import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../Models/UserModel.js";


export const Register=async(req,res)=>{
    const {name,email,password}=req.body

    if(!name || name.length<3 || !email || !password) {

        return res.status(400).send('Invalid Inputs')
    }


    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).send('User Already exist');
        }

        const count=await User.countDocuments({role:'user'})
        const userId=`USER${String(count + 1).padStart(3,'0')}`

        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({
            name,
            email,
            password:hashedPassword,
            userId
        })

        await user.save();

        const token=jwt.sign({id:user._id,role:user.role,userId},process.env.JWT_SECRET)
        res.cookie('token',token,{httpOnly:true})
        res.send('Registered Successfully')
    } catch (error) {

        res.status(500).send('Server error')
        console.log("The Error in the Register:", error)
        
    }




}


export const Login=async(req,res)=>{
    const {email,password}= req.body;

    try {

        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))) {
            return res.status(400).send('Invalid Credeintials');
        }

        const token=jwt.sign({id:user._id,role:user.role,userId:user.userId},process.env.JWT_SECRET)
        res.cookie('token',token,{httpOnly:true})
        res.send('Logged In Successfully')
        
    } catch (error) {

        res.status(500).send('Server error')

        console.log("Ther Error in the Login",error)
        
    }
}

export const Admin=async(req,res)=>{
    const admin=await User.findOne({role:'admin'})

    if(!admin){
        const hashedPassword=await bcrypt.hash('admin123',10)
        await User.create({
            name:'Admin',
            email:"admin@gmail.com",
            password:hashedPassword,
            role:'admin',
            userId:'ADMIN01'
        })

        res.send('Admin created')
    }else{
        res.send('Admin already Exists')
    }
}



