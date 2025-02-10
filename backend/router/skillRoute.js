import express from "express";
import {
  createSkill,
  deleteSkill,
  updateSkill,
  getAllSkill,
} from "../controller/skillController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, createSkill);
router.put("/upkdate/:id", isAuthenticated, updateSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.get("/viewAll", getAllSkill);

export default router;
