import express from "express";
import { Op } from "sequelize";

import { User, Blog } from "../models/index.js";

const router = express.Router();

router.post("/", async (request, response) => {
  const user = await User.create(request.body);
  response.json(user);
});

router.get("/", async (_request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  response.json(users);
});

router.get("/:id", async (request, response) => {
  const where = { read: { [Op.or]: [true, false] } };

  if (request.query.read) {
    if (request.query.read === "true" || request.query.read === "false") {
      where.read = request.query.read === "true";
    } else {
      return response.status(400).json({ error: "invalid query parameter" });
    }
  }

  const user = await User.findByPk(request.params.id, {
    attributes: ["name", "username"],
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
        through: {
          attributes: ["id", "read"],
          where,
        },
      },
    ],
  });
  response.json(user);
});

router.put("/:username", async (request, response) => {
  const user = await User.findOne({
    where: { username: request.params.username },
  });

  const isPasswordCorrect = request.body.password === "secret";

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: "wrong username or password" });
  }

  user.username = request.body.newUsername;
  await user.save();
  response.json(user);
});

export default router;
