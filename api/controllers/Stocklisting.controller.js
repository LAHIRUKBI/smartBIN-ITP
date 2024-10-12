import Listing from '../models/Createlisting.model.js';
import multer from 'multer';
import path from 'path';







// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});




// Modify your listing creation route to handle image uploads
export const createListing = async (req, res) => {
  try {
    const { stockName, quantity, unitOfMeasure, category, addDate, expiryDate, price, userRef } = req.body;

    if (!stockName || !quantity || !unitOfMeasure || !category || !addDate || !expiryDate || !price || !userRef) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newListing = new Listing({
      name: stockName, // Make sure this matches your schema
      quantity,
      unitOfMeasure,
      category,
      addDate,
      expiryDate,
      price,
      userRef,
    });

    const savedListing = await newListing.save();

    res.status(201).json({ success: true, listing: savedListing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};







// Get a specific listing by ID
export const getListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    return res.status(200).json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while fetching the listing.', error: error.message });
  }
};







// Get all listings with optional search
export const getListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
    })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while fetching the listings.', error: error.message });
  }
};







// Delete a specific listing by ID
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    return res.status(200).json({ success: true, message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while deleting the listing.', error: error.message });
  }
};








export const updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedStock = await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true, // Ensures that validations in the schema are run
    });

    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    res.json(updatedStock);
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Failed to update stock', error: error.message });
  }
};