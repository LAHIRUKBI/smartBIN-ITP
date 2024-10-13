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
  
