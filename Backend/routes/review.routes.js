import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { addReview, getReviews, getSpesificReviews } from "../controllers/reviews.controller.js"

const router = express.Router()

router.get("/", getReviews)

router.get("/:productId", getSpesificReviews)

router.post("/", protectRoute, addReview)


export default router