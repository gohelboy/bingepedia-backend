const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: __dirname+"./../public/profile-pictures",
    filename: (req, file, cb) => {
        cb(null, (req.userId ? req.userId : Date.now()) +"-"+ file.originalname);
    },
})

exports.upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"){
            cb(null, true)
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    }
})