import express from 'express';
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/Stocklisting.controller.js';


const router = express.Router();

router.post('/create', createListing);
router.get('/get/:id', getListing);  // Route to get a specific listing by ID
router.get('/get', getListings);     // Route to get all listings
router.delete('/delete/:id', deleteListing); // Route to delete a listing
router.put('/update/:id', updateListing);

export default router;