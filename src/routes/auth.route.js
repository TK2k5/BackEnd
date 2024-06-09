import express from "express";
import { userController } from "../controllers/user.controller.js";

const router = express.Router();

// register
router.post("/register", userController.register);

// login
router.post("/login", userController.login);

export default router;
