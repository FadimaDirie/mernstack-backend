// authMiddleware.js

const jwt = require("jsonwebtoken")
const  authMiddleware = (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];

   if(!token) {
       res.status(401).json({message: "Access denied"})
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)

   req.user = decoded?.user;

   next();

}

module.exports = authMiddleware