import express from 'express'
import { auth } from '../Middlewares/authMiddleware.js'
import { upload } from '../Middlewares/uploadMiddleware.js'
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../Controllers/productController.js'

export const productRoutes=express.Router()

productRoutes.post('/',auth,upload.single('image'),addProduct)
productRoutes.put('/:id',auth,upload.single('image'),updateProduct)
productRoutes.delete('/:id',auth,deleteProduct)
productRoutes.get('/',auth,getAllProduct)
productRoutes.get('/:id',auth,getProduct)



