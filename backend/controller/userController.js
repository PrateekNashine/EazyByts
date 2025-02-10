import getAsyncError from "../middlewares/getAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendMail } from "../utils/sendMail.js";
import crypto from "crypto";

export const register = getAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload required documents", 400));
  }
  const { profile_photo, resume } = req.files;

  const cloudinaryResponseProfilePhoto = await cloudinary.uploader.upload(
    profile_photo.tempFilePath,
    { folder: "Profile Photo" }
  );
  if (!cloudinaryResponseProfilePhoto || cloudinaryResponseProfilePhoto.error) {
    console.error(
      "Cloudinary error!",
      cloudinaryResponseProfilePhoto.error || "Unknown Cloudinary Error"
    );
  }

  const cloudinaryResponseResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "Resume" }
  );
  if (!cloudinaryResponseResume || cloudinaryResponseResume.error) {
    console.error(
      "Cloudinary error!",
      cloudinaryResponseResume.error || "Unknown Cloudinary Error"
    );
  }

  const {
    fullname,
    email,
    number,
    aboutme,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedinURL,
  } = req.body;

  const user = await User.create({
    fullname,
    email,
    number,
    aboutme,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedinURL,
    profile_photo: {
      public_id: cloudinaryResponseProfilePhoto.public_id,
      url: cloudinaryResponseProfilePhoto.secure_url,
    },
    resume: {
      public_id: cloudinaryResponseResume.public_id,
      url: cloudinaryResponseResume.secure_url,
    },
  });
  //   res.status(200).json({
  //     success: true,
  //     message: "User registered successfully",
  //   });

  generateToken(user, "User registered successfully", 201, res);
});

export const login = getAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and Password are required to login!"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Invalid credentials! Please check and try again")
    );
  }
  const matchPassword = await user.comparePasswords(password);
  if (!matchPassword) {
    return next(
      new ErrorHandler("Invalid credentials! Please check and try again")
    );
  }
  generateToken(user, "Log in successfull", 200, res);
});

export const logout = getAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User Logged out successfully",
    });
});

export const getUser = getAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = getAsyncError(async (req, res, next) => {
  const updatedUserData = {
    fullname: req.body.fullname,
    email: req.body.email,
    number: req.body.number,
    aboutme: req.body.aboutme,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    linkedinURL: req.body.linkedinURL,
  };
  if (req.files && req.files.profile_photo) {
    const profile_photo = req.files.profile_photo;
    const user = await User.findById(req.user._id);
    const profileImageId = user.profile_photo.public_id;
    await cloudinary.uploader.destroy(profileImageId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      profile_photo.tempFilePath,
      { folder: "Profile Photo" }
    );
    updatedUserData.profile_photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user._id);
    const resumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "Resume" }
    );
    updatedUserData.resume = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user._id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const updatePassword = getAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please fill all the details.", 400));
  }
  const user = await User.findById(req.user._id).select("+password");
  const isPasswordMatched = await user.comparePasswords(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Password", 400));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("Confirm password does not match the new password.", 400)
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

export const forgetPassword = getAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordURL = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
  const message = `Reset Password \n\n Reset password link is: \n ${resetPasswordURL}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Portfolio reset password link",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Reset password link sent to ${user.email}.`,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = getAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("shake256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Password token is invalid", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password do not match", 400)
    );
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  generateToken(user, "Password reset successfully", 200, res);
});

export const getUserPortfolio = getAsyncError(async (req, res, next) => {
  const id = "67a4738b6b5e13ff0900686d";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});
