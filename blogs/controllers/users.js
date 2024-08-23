import express from "express";

import { User } from "../models/index.js";

const router = express.Router();

router.post("/", async (request, response) => {
  const user = await User.create(request.body);
  response.json(user);
});

router.get("/", async (_request, response) => {
  const users = await User.findAll();
  response.json(users);
});

router.put("/:username", async (request, response) => {
  const user = await User.findOne({
    where: { username: request.params.username },
  });

  const isPasswordCorrect = request.body.password === "secret";

  if (!(user && isPasswordCorrect)) {
    return response.status(401).send({ error: "wrong username or password" });
  }

  user.username = request.body.newUsername;
  await user.save();
  response.json(user);
});

export default router;
