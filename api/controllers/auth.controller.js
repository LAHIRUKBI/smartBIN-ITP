import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';




// Signup method
export const signup = async (req, res, next) => {
  const { email, password, role } = req.body; // Removed phoneNumber if not necessary

  try {
    // Check if user already exists before creating a new user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use, please choose a different one.' });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    next(error); // Pass the error to an error handler if something unexpected occurs
  }
};







// Signin method with role validation
export const signin = async (req, res, next) => {
  const { email, password, role } = req.body; // Including role in the request

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).json({ message: 'User not found!' });

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials!' });

    // Check if the role matches
    if (validUser.role !== role) {
      return res.status(403).json({ message: 'Role mismatch: You are not authorized for this role' });
    }

    // Generate token with user ID and role
    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};








// Get profile
export const getProfile = async (req, res, next) => {
  const { id } = req.user; // Ensure this matches the field in the token

  try {
    const user = await User.findById(id); // Ensure you're querying with the correct ID
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    next(error);
  }
};






// auth.controller.js
export const signOut = (req, res) => {
  // No specific server-side logic required for sign-out in this case
  res.status(200).json({ message: 'Signed out successfully' });
};
