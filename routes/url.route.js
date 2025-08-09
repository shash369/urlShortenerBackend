import express from "express"
const router=express.Router();
import { handleNewShortURL,getClicks} from "../controllers/url.controller.js";

router.post('/',handleNewShortURL);
router.get('/clicks/:shortcode',getClicks)

export default router;