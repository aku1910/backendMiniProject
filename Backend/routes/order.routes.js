import express from "express"

import protectRoute from "../middlewares/protectRoute.js"

import {addOrder , getSingleOrder , getOrders} from "../controllers/orders.controller.js"

const router = express.Router()

router.use(protectRoute)

router.get("/" ,protectRoute, getOrders)
router.get("/:userId",protectRoute, getSingleOrder)
router.post("/",protectRoute,addOrder)

export default router