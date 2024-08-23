import express from "express";

import { Blog } from "../models/index.js";

const router = express.Router();

router.get("/", async (_request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

router.post("/", async (request, response) => {
  try {
    const createdBlog = await Blog.create(request.body);
    return response.json(createdBlog);
  } catch (error) {
    return response.status(400).end();
  }
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
    try {
      await blog.save();
      response.json(blog);
    } catch (error) {
      response.status(400).json({ error: "likes is not an integer" });
    }
  } else {
    response.status(404).end();
  }
});

export default router;
