/*
const express = require("express");

const router = express.Router();

const Vehicles = require("../models/vehicle");
const vehicle = require("../models/vehicle");



//const vehicles = require("../models/vehicle")

//test
 router.get("/test", (req,res) => res.send("Vehicle Route Working"));           //create

 router.post("/", (req, res) =>{
    Vehicles.create(req.body)
    .then(()=> res.json({msg:"Vehicle Added Successfully.."}))
    .catch(()=>res.status(400).json({msg:"Vehicle Adding Faild"}))
})



router.get("/", (req, res) => {             //get
    Vehicles.find()
    .then(vehicles => res.json(vehicles)) // store the result in the vehicles variable
    .catch(() => res.status(400).json({msg:"No any Vehicle Found"}))
})


router.get("/:id", (req, res) => {
    Vehicles
      .findById(req.params.id)
      .then((vehicle) => res.json(vehicle))
      .catch(() => res.status(404).json({ msg: "Cannot Find This Vehicle" }));
  });


router.put("/:id", (req, res) => {         //Update                             //update
    Vehicles.findByIdAndUpdate(req.params.id, req.body)
   .then(()=> res.json({ msg: "Vehicle updated successfully..."}))
   .catch(err => res.status(400).json({ msg: "Vehicle updating fail..."}));
});


router.delete("/:id", (req, res) => {                                       //delete
    Vehicles.findByIdAndDelete(req.params.id)
   .then(()=> res.json({ msg: "Vehicle deleted successfully..."}))
   .catch(err => res.status(400).json({ msg: "Vehicle delete fail..."}));

});



 module.exports = router;*/

import express from "express";
import Vehicles from "../models/vehicle.js"; // Ensure this path is correct

const router = express.Router();

// Test route
//10-01-2024
router.get("/test", (req, res) => res.send("Vehicle Route Working"));

// GET route to fetch all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicles.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ msg: "No vehicles found", error });
  }
});

// POST route to create a new vehicle
router.post("/", async (req, res) => {
  try {
    const vehicle = new Vehicles(req.body);
    await vehicle.save();
    res.status(201).json({ msg: "Vehicle Added Successfully", vehicle });
  } catch (error) {
    res.status(400).json({ msg: "Vehicle Adding Failed", error });
  }
});

// GET route to fetch a specific vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicles.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ msg: "Cannot find this vehicle" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ msg: "Cannot find this vehicle", error });
  }
});

// PUT route to update a vehicle by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedVehicle = await Vehicles.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVehicle) {
      return res.status(404).json({ msg: "Vehicle updating failed" });
    }
    res
      .status(200)
      .json({ msg: "Vehicle updated successfully", updatedVehicle });
  } catch (error) {
    res.status(400).json({ msg: "Vehicle updating failed", error });
  }
});

// DELETE route to remove a vehicle by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedVehicle = await Vehicles.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      return res.status(404).json({ msg: "Vehicle deletion failed" });
    }
    res.status(200).json({ msg: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Vehicle deletion failed", error });
  }
});

export default router; // Ensure to export the router at the end
