// routes/route.js
import express from "express";
import Rout from "../models/rout.js"; // Adjust the path as needed

const router = express.Router();

// Test route
router.get("/test", (req, res) => res.send("Route API Working"));

// GET route to fetch all routes
router.get("/", async (req, res) => {
  try {
    const routes = await Rout.find();
    res.status(200).json(routes);
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ msg: "No routes found", error: error.message });
  }
});

// POST route to create a new route
router.post("/", async (req, res) => {
  try {
    const route = new Rout(req.body);
    await route.save();
    res.status(201).json({ msg: "Route added successfully", route });
  } catch (error) {
    console.error("Error adding route:", error);
    res.status(400).json({ msg: "Route adding failed", error: error.message });
  }
});

// GET route to fetch a specific route by ID
router.get("/:id", async (req, res) => {
  try {
    const route = await Rout.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ msg: "Route not found" });
    }
    res.status(200).json(route);
  } catch (error) {
    console.error("Error fetching route:", error);
    res.status(404).json({ msg: "Route not found", error: error.message });
  }
});

// PUT route to update a route by ID
router.put("/:id", async (req, res) => {
  try {
    // Ensure req.body contains necessary fields
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ msg: "Request body is empty or missing data" });
    }

    // You can add more field-specific validation here based on your model

    // Find and update the route
    const updatedRoute = await Rout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // If route not found, return 404
    if (!updatedRoute) {
      return res.status(404).json({ msg: "Route not found" });
    }

    // Return the updated route
    res.status(200).json({ msg: "Route updated successfully", updatedRoute });
  } catch (error) {
    console.error("Error updating route:", error);
    res
      .status(400)
      .json({ msg: "Route updating failed", error: error.message });
  }
});

// DELETE route to remove a route by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRoute = await Rout.findByIdAndDelete(req.params.id);
    if (!deletedRoute) {
      return res.status(404).json({ msg: "Route deletion failed" });
    }
    res.status(200).json({ msg: "Route deleted successfully" });
  } catch (error) {
    console.error("Error deleting route:", error);
    res
      .status(400)
      .json({ msg: "Route deletion failed", error: error.message });
  }
});

export default router; // Ensure to export the router at the end
