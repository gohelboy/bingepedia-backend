const route = require('express').Router();
const { upload } = require('../middleware/multer');
const { register, login, uploadProfilePicture } = require('../controller/user.ctrl');
const { isAuthenticated } = require('../middleware/auth');
const { verifyUser } = require('../controller/user.ctrl');
const { resendOTP } = require('../controller/user.ctrl');

route.post('/register', register);
route.post('/login', login);
route.post('/verify-user', verifyUser);
route.post('/resend-otp', resendOTP);
route.post('/upload-profile-picure', isAuthenticated, upload.single('image'), uploadProfilePicture);

module.exports = route;