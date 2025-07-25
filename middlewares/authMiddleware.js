// middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Hubi in token la diray
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied: Token ma jiro ama waa khaldan yahay" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ku dar user info request-ka
    req.user = decoded?.user || decoded; // haddii aad encode-gareyso { user: { id, email, role } }

    next(); // u gudub route-ga
  } catch (error) {
    return res.status(401).json({ message: "Token invalid ama wuu dhacay" });
  }
};

module.exports = authMiddleware;
