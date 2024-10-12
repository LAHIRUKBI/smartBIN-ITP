import ServiceRequest from '../models/ServiceRequest.model.js';




// Submit a New Service Request
export const submitRequest = async (req, res) => {
  try {
    const { name, email, phone, address, additionalInfo, serviceId, paymentMethod } = req.body;

    const newRequest = new ServiceRequest({
      name,
      email,
      phone,
      address,
      additionalInfo,
      serviceId,
      paymentMethod, // Include paymentMethod
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully', newRequest });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ message: 'Error submitting request', error });
  }
};







// Get All Service Requests
export const getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find();
    res.status(200).json(serviceRequests);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    res.status(500).json({ message: 'Error fetching service requests', error });
  }
};





//Get a Service Request by ID
export const getServiceRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceRequest = await ServiceRequest.findById(id);
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }
    res.status(200).json(serviceRequest);
  } catch (error) {
    console.error('Error fetching service request:', error);
    res.status(500).json({ message: 'Error fetching service request' });
  }
};






// Update service request
export const updateServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Delete service request
export const deleteServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await ServiceRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};