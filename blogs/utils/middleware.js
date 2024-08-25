import jwt from "jsonwebtoken";

import { SECRET } from "./config.js";

const tokenDecoder = (request, response, next) => {
  const authorizationHeader = request.get("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return response
      .status(400)
      .json({ error: "missing or invalid authorization header" });
  }
  try {
    request.decodedToken = jwt.verify(authorizationHeader.substring(7), SECRET);
  } catch {
    return response.status(401).json({ error: "token invalid" });
  }
  next();
};

const errorHandler = (error, _request, response, next) => {
  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: [error.message.split(": ")[1]] });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: "invalid type" });
  }

  next();
};

export { errorHandler, tokenDecoder };
