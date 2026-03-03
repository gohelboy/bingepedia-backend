const route = require('express').Router();
const { upload } = require('../middleware/multer');
const {
  register,
  login,
  uploadProfilePicture,
  verifyUser,
  resendOTP,
  forgotPassword,
  resetPassword,
} = require('../controller/user.ctrl');
const { isAuthenticated } = require('../middleware/auth');

route.post('/register', register);
route.post('/login', login);
route.post('/verify-user', verifyUser);
route.post('/resend-otp', resendOTP);
route.post('/forgot-password', forgotPassword);
route.post('/reset-password', resetPassword);
route.post('/upload-profile-picture', isAuthenticated, upload.single('image'), uploadProfilePicture);

module.exports = route;