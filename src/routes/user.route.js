import {
  createUser,
  deleteUser,
  getDetailUser,
  getOneUser,
  updateUser,
} from "../controllers/user.controller.js";

import { checkAuth } from "../middlewares/checkPermission.middleware.js";
import express from "express";

const router = express.Router();

// router.get("/user", getAllUser);
router.get("/user", checkAuth, getDetailUser);
router.get("/user/:userId", getOneUser);
router.post("/user", createUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
