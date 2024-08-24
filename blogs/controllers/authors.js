import express from "express";

import { Blog } from "../models/index.js";

import { sequelize } from "../utils/db.js";

const router = express.Router();

router.get("/", async (_request, response) => {
  const results = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [["likes", "DESC"]],
  });
  response.json(results);
});

export default router;
