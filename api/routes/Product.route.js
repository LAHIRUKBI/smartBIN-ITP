import express from "express";
import { addProduct, getAllProducts } from "../controllers/Product.controller.js";

const router = express.Router();

// Route for adding a new product
router.post("/", addProduct);

// Route for fetching all products
router.get("/", getAllProducts);

export default router;
