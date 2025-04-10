import { auth, userOnly } from "../Middlewares/authMiddleware.js"
import express from 'express'
import { addToWishlist, getWishlist, removeFromWishlist } from "../Controllers/wishlistController.js"

export const wishlistRoutes=express.Router()


wishlistRoutes.post('/',auth,userOnly,addToWishlist)
wishlistRoutes.delete('/:productId',auth,userOnly,removeFromWishlist)
wishlistRoutes.get('/',auth,userOnly,getWishlist)
