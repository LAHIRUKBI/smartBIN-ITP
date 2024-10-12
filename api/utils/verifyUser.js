import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed', err);
      return res.sendStatus(403); // Forbidden
    }
    req.userRef = user.userRef; // Attach userRef to request object
    next();
  });
};
