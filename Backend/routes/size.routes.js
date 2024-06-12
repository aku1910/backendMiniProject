import express from "express"

import { addSize , getSize } from "../controllers/size.controller.js";

const router = express.Router()

router.get("/", getSize);


router.post("/", addSize);


export default router