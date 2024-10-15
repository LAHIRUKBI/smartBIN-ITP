import Product from "../models/Product.model.js";

// Controller to add a product
export const addProduct = async (req, res) => {
  const { name, material, description, quantity, unitPrice, date } = req.body;
  try {
    const newProduct = new Product({
      name,
      material,
      description,
      quantity,
      unitPrice,
      date,
    });
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding product" });
  }
};


// Controller to get all products
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.status(200).json({ success: true, data: products });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error fetching products" });
    }
  };
  


  // Controller to delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
};

// Controller to update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

// Controller to fetch a single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Product not found' });
  }
};