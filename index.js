import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { ConnectDB } from './Connection/DB.js'
import {authRoutes} from './Routes/authRoutes.js'
import {productRoutes} from './Routes/productRoutes.js'
import {wishlistRoutes} from './Routes/wishlistRoutes.js'


dotenv.config()

ConnectDB()

const app=express() 

app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static('uploads'));

app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/wishlist',wishlistRoutes)

 

const PORT =process.env.PORT || 4000











app.listen(PORT,()=>{
    console.log(`The server running on: ${PORT}`)
})