const {
  failedResponse,
  successResponse,
  errorResponse,
  successResponseWithData,
} = require("../utils/response");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otp = require("../utils/otpGenerate");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return failedResponse(res, "Invalid values");
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser && !existingUser?.isVerified) {
      await userModel.findByIdAndUpdate({ _id: existingUser._id }, { otp: otp.generate() }, { new: true });
      return successResponseWithData(
        res,
        "Already registered, complete verification!",
        { isVerified: false }
      );
    }

    if (existingUser && existingUser?.isVerified)
      return successResponseWithData(
        res,
        "User already exists with the this email address!",
        { isVerified: true }
      );
    const { password, ...rest } = req.body;

    encryptedUser = {
      ...rest,
      password: await bcrypt.hash(password, 10),
      otp: otp.generate(),
    };
    const newUser = new userModel(encryptedUser);
    await newUser.save();
    return successResponse(
      res,
      "Successfully registered, complete your verifiaction!"
    );
  } catch (error) {
    return errorResponse(res, error);
  }
};

exports.verifyUser = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return failedResponse(res, "Invalid values");
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) return failedResponse(res, "User not found");
    if (existingUser.otp !== otp.toString()) return failedResponse(res, "invalid otp!");
    const user = await userModel.findByIdAndUpdate(
      { _id: existingUser._id },
      { isVerified: true }, { new: true }
    );
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username
    }
    const token = jwt.sign(payload, "jwt-secret");
    return successResponseWithData(res, "verification done", {
      email: user.email,
      username: user.username,
      id: user._id,
      isVerified: user.isVerified,
      token: token,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

exports.resendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return failedResponse(res, "Invalid value");
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) return failedResponse(res, "user not found");
    if (existingUser && existingUser?.isVarified)
      return successResponseWithData(res, "You are already verified", {
        isVarified: true,
      });
    await userModel.findOneAndUpdate({ email: email }, { otp: otp.generate() });
    return successResponse(res, "otp resent");
  } catch (error) {
    return errorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return failedResponse(res, "Invalid values");
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) return failedResponse(res, "User not found with this email address!");
    await bcrypt.compare(password, existingUser.password, async (error, result) => {
      if (error) return errorResponse(res, error);
      if (!result) return failedResponse(res, "Password is incorrect!");
      if (existingUser && !existingUser?.isVerified) {
        await userModel.findByIdAndUpdate({ _id: existingUser._id }, { otp: otp.generate() }, { new: true });
        return successResponseWithData(
          res,
          "your verifiaction has not been completed yet!",
          { isVerified: false }
        );
      }

      delete existingUser.password;
      const payload = {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      }
      const token = jwt.sign(payload, "jwt-secret");
      successResponseWithData(res, "Loggedin successfully", {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        token: token,
        isVerified: true,
      });
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

exports.uploadProfilePicture = async (req, res) => {
  successResponseWithData(res, "Uploading profile picture", {
    filename: req.file,
  });
};
