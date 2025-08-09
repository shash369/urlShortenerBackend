import express from "express";
import { loginAdmin, getAllUrls } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/all", getAllUrls);

export default router;
