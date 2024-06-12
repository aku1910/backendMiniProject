import express from "express";
import { addSingleProduct, getSingleProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts); 

router.get("/:productId", getSingleProduct); 

router.post("/", addSingleProduct); 

export default router;
