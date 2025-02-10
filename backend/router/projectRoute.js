import express from "express";
import {
  addNewProject,
  updateProject,
  deleteProject,
  getAllProject,
  getProject,
} from "../controller/projectController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.get("/viewAll", getAllProject);
router.get("/get/:id", getProject);

export default router;
