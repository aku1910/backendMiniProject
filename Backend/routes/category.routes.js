import express from "express"

import { addCategory , getCategories } from "../controllers/category.controller.js"

const router = express.Router()

router.get("/" , getCategories)

router.post("/" , addCategory)

export default router