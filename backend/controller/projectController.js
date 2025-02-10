import ErrorHandler from "../middlewares/error.js";
import getAsyncError from "../middlewares/getAsyncError.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = getAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Screen Shot is required"), 400);
  }
  const { project_shots } = req.files;
  const {
    title,
    description,
    projectLink,
    githubLink,
    technologies,
    stack,
    deployed,
  } = req.body;
  if (
    !title ||
    !description ||
    !projectLink ||
    !githubLink ||
    !technologies ||
    !stack ||
    !deployed
  ) {
    return next(new ErrorHandler("Project details are required"), 400);
  }
  const cloudinaryRespnse = await cloudinary.uploader.upload(
    project_shots.tempFilePath,
    {
      folder: "Project Shots",
    }
  );
  if (!cloudinaryRespnse || cloudinaryRespnse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryRespnse.error || "Unkown Error"
    );
  }

  const project = await Project.create({
    title,
    description,
    projectLink,
    githubLink,
    technologies,
    stack,
    deployed,
    project_shots: {
      public_id: cloudinaryRespnse.public_id,
      url: cloudinaryRespnse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New project has been added",
    project,
  });
});

export const deleteProject = getAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 400));
  }
  const projectShotId = project.project_shots.public_id;
  await cloudinary.uploader.destroy(projectShotId);
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "The project has been deleted.",
    project,
  });
});

export const updateProject = getAsyncError(async (req, res, next) => {
  const updatedData = {
    title: req.body.title,
    description: req.body.description,
    projectLink: req.body.projectLink,
    githubLink: req.body.githubLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };
  if (req.files && req.files.project_shots) {
    const project_shots = req.files.project_shots;
    const project = await Project.findById(req.params.id);
    const project_shotsId = project.project_shots.public_id;
    await cloudinary.uploader.destroy(project_shotsId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      project_shots.tempFilePath,
      { folder: "Project Shots" }
    );
    updatedData.project_shots = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  const project = await Project.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Project has been updated.",
    project,
  });
});

export const getAllProject = getAsyncError(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

export const getProject = getAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 400));
  }
  res.status(200).json({
    success: true,
    project,
  });
});
