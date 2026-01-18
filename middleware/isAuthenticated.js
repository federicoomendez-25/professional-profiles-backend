const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
