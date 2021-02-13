import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//Middleware function - Token verification
export const verify = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acces Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
