import express from "express"

import { addColor, getColors} from "../controllers/color.controller.js";

const router = express.Router()

router.get("/", getColors);

router.post("/", addColor);


export default router