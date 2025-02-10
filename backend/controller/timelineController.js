import ErrorHandler from "../middlewares/error.js";
import getAsyncError from "../middlewares/getAsyncError.js";
import { Timeline } from "../models/timelineSchema.js";

export const postTimeline = getAsyncError(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const createTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline added successfully.",
    createTimeline,
  });
});

export const deleteTimeline = getAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 400));
  }
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline deleted successfully",
  });
});

export const getTimeline = getAsyncError(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});
