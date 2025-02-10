import ErrorHandler from "../middlewares/error.js";
import getAsyncError from "../middlewares/getAsyncError.js";
import { Skill } from "../models/skillsSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const createSkill = getAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Skill image/svg is required"), 400);
  }
  const { svg } = req.files;
  const { title, proficiency } = req.body;
  if (!title || !proficiency) {
    return next(
      new ErrorHandler("Skill title and proficiency is required"),
      400
    );
  }
  const cloudinaryRespnse = await cloudinary.uploader.upload(svg.tempFilePath, {
    folder: "Skills",
  });
  if (!cloudinaryRespnse || cloudinaryRespnse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryRespnse.error || "Unkown Error"
    );
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryRespnse.public_id,
      url: cloudinaryRespnse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New skill added",
    skill,
  });
});

export const deleteSkill = getAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found", 400));
  }
  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "The skill has been deleted.",
    skill,
  });
});

export const updateSkill = getAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found", 400));
  }
  const { proficiency } = req.body;
  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    { new: true, runValidators: true, useFindAndModify: true }
  );
  res.status(200).json({
    success: true,
    message: "The skill has been updated.",
    skill,
  });
});

export const getAllSkill = getAsyncError(async (req, res, next) => {
  const skills = await Skill.find();
  res.status(200).json({
    success: true,
    skills,
  });
});
