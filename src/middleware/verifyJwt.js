import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function verifyJwt(req, res, next) {
  try {
    
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: "Unauthorized Access" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secret");
    const user = await User.findById(decoded?._id);
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

