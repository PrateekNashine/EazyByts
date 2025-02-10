import getAsyncError from "../middlewares/getAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = getAsyncError(async (req, res, next) => {
  const { senderName, subject, message } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Missing details", 400));
  }
  const data = await Message.create({
    senderName,
    subject,
    message,
  });
  res.status(200).json({
    success: true,
    message: "Message sent successfully.",
    data,
  });
});

export const getAllMessages = getAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessage = getAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message not found.", 400));
  }
  await message.deleteOne();
  res.status(200).json({
    success: true,
    message: "Message deleted",
  });
});
