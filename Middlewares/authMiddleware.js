import jwt from 'jsonwebtoken'

export const auth = (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).send("Login Required")
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next()
    } catch (error) {
        
        res.status(400).send("Invalid Token")
        console.log(error)
    }
} 


export const userOnly=(req,res,next)=>{
    if(req.user.role==='admin') {
        return res.status(403).send('Admins cannot access this')
    }
    next();

}