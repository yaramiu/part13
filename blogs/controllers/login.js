import express from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

import { SECRET } from "../utils/config.js";

const router = express.Router();

router.post("/", async (request, response) => {
  const user = await User.findOne({
    where: { username: request.body.username },
  });
  const isPasswordCorrect = request.body.password === "secret";
  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: "wrong username or password" });
  }
  const userForToken = {
    id: user.id,
    username: user.username,
  };
  const token = jwt.sign(userForToken, SECRET);
  response.json({ token, name: user.name, username: user.username });
});

export default router;
