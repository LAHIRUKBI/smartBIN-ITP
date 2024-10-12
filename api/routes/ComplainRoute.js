import express from "express";

import {
  getAllDetails,
  addData,
  getById,
  updateData,
  deleteData,
} from "../controllers/ComplainConntroller.js"; // Adjust path as necessary
const router = express.Router();
router.get("/", getAllDetails);
router.post("/", addData);
router.get("/:id", getById); 
router.put("/:id", updateData);
router.delete("/:id", deleteData);

//export
export default router;
