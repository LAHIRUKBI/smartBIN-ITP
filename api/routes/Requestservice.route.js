import express from 'express';
import { deleteServiceRequest, getServiceRequestById, getServiceRequests, submitRequest, updateServiceRequest } from '../controllers/ServiceRequest.controller.js'; // Adjust the import if necessary

const router = express.Router();

router.post('/submit', submitRequest);  // POST new service request
router.get('/servicerequests', getServiceRequests);  // GET all service requests
router.get('/servicerequests/:id', getServiceRequestById);  // GET a specific service request by ID
router.put('/servicerequests/:id', updateServiceRequest);  // PUT update service request by ID
router.delete('/servicerequests/:id', deleteServiceRequest);  // DELETE service request by ID


export default router;
