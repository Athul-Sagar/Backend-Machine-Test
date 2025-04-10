import multer from "multer";
import path from 'path'

const storage=multer.diskStorage({
    destination:'./uploads/public/',
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

 export const upload=multer({
    storage,
    limits:{fileSize:1000000},
    fileFilter:(req,file,cb)=>{
        const filetypes=/jpeg|jpg|png/;
        const extname=filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
        if(extname) {
            return cb(null,true);
            
        }

        cb(new Error('Only jpg,jpeg,png allowed'))
    }
})