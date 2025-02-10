import express from "express";
import {
  postTimeline,
  deleteTimeline,
  getTimeline,
} from "../controller/timelineController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/viewall-timeline", getTimeline);

export default router;
