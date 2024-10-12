// Add logging to verify the middleware
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log token data
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Log error
    res.status(403).json({ message: 'Invalid token!' });
  }
};
