import express from 'express'
import { Admin, Login, Register } from '../Controllers/authController.js'


export const authRoutes=express.Router()

authRoutes.post('/register',Register)
authRoutes.post('/login',Login)
authRoutes.get('/admin',Admin)

