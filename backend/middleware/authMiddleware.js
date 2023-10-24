import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = (Model) => {
  return asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.item = await Model.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });
};

export { protect };
