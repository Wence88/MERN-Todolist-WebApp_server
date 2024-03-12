const jwt = require("jsonwebtoken");

// Instantiate the JWT token validation middleware
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get the token from headers "Bearer 123XYZ..."
    const payload = jwt.verify(token, process.env.TOKEN_SECRET); // the verify method decodes/validates the token and returns the payload

    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json("token not provided or not valid");
  }
};

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
};
