import express, { request } from "express";
import { Op } from "sequelize";

import { Blog, User } from "../models/index.js";

import {
  tokenDecoder,
  handleDisabledAccounts,
  checkSessionValidity,
} from "../utils/middleware.js";

const router = express.Router();

router.get("/", async (request, response) => {
  let where = {};

  if (request.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${request.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${request.query.search}%`,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: "userId" },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  response.json(blogs);
});

router.post(
  "/",
  tokenDecoder,
  handleDisabledAccounts,
  checkSessionValidity,
  async (request, response) => {
    const { author, url, title, year } = request.body;

    if (
      !year ||
      isNaN(year) ||
      !(Number(year) >= 1991 && Number(year) <= new Date().getFullYear())
    ) {
      return response.status(400).json({ error: "invalid year" });
    }

    const blog = {
      author,
      url,
      title,
      year: Number(year),
    };
    const createdBlog = await Blog.create({
      ...blog,
      userId: request.decodedToken.id,
    });
    return response.json(createdBlog);
  }
);

router.delete(
  "/:id",
  tokenDecoder,
  handleDisabledAccounts,
  checkSessionValidity,
  async (request, response) => {
    const blog = await Blog.findByPk(request.params.id);
    if (blog && blog.userId === request.decodedToken.id) {
      await blog.destroy();
    }
    response.status(204).end();
  }
);

router.put("/:id", async (request, response) => {
  const blog = await Blog.findByPk(request.params.id);
  if (blog) {
    blog.likes = request.body.likes;
    await blog.save();
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

export default router;
