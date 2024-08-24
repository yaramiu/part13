import express from "express";

import { Blog } from "../models/index.js";

import { tokenDecoder } from "../utils/middleware.js";

const router = express.Router();

router.get("/", async (_request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

router.post("/", tokenDecoder, async (request, response) => {
  const createdBlog = await Blog.create({
    ...request.body,
    userId: request.decodedToken.id,
  });
  return response.json(createdBlog);
});

router.delete("/:id", async (request, response) => {
  const blog = await Blog.findByPk(request.params.id);
  if (blog) {
    await blog.destroy();
  }
  response.status(204).end();
});

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
