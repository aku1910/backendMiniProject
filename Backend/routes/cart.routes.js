import express from "express"

import protectRoute from "../middlewares/protectRoute.js"

import { addCarts, getCarts } from "../controllers/cart.controller.js"

const router = express.Router()

router.use(protectRoute)

router.post("/", protectRoute, addCarts)

router.get("/", getCarts)


export default router