import express from "express";
import { addProduct, getAllProducts, deleteProduct, updateProduct, getProductById } from "../controllers/Product.controller.js";

const router = express.Router();

// Route for adding a new product
router.post("/", addProduct);

// Route for fetching all products
router.get("/", getAllProducts);

// Route for deleting a product by ID
router.delete("/:id", deleteProduct);

// Route for updating a product by ID
router.put("/:id", updateProduct);

// Route for fetching a product by ID
router.get("/:id", getProductById);

export default router;
