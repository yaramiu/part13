import jwt from "jsonwebtoken";

import { SECRET } from "./config.js";
import { Session, User } from "../models/index.js";

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

const handleDisabledAccounts = async (request, response, next) => {
  const user = await User.findByPk(request.decodedToken.id);
  if (!user) {
    return response.status(404).json({ error: "could not find user" });
  }
  if (user.disabled) {
    response
      .status(401)
      .json({ error: "account disabled, please contact admin" });
  }
  next();
};

const checkSessionValidity = async (request, response, next) => {
  const session = await Session.findByPk(request.decodedToken.id);
  if (!session || request.get("Authorization").substring(7) !== session.token) {
    return response.status(401).json({ error: "session invalid" });
  }
  next();
};

const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: [error.message.split(": ")[1]] });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: "invalid type" });
  }

  next();
};

export {
  errorHandler,
  tokenDecoder,
  handleDisabledAccounts,
  checkSessionValidity,
};
