import express from "express";

import { ReadingList } from "../models/index.js";

import { tokenDecoder } from "../utils/middleware.js";

const router = express.Router();

router.post("/", async (request, response) => {
  await ReadingList.create(request.body);
  response.status(201).end();
});

router.put("/:id", tokenDecoder, async (request, response) => {
  const readingList = await ReadingList.findByPk(request.params.id);

  if (!readingList) {
    return response.status(404).json({ error: "reading list not found" });
  } else if (readingList.userId !== request.decodedToken.id) {
    return response.status(401).json({ error: "wrong credentials" });
  }

  readingList.read = request.body.read;
  await readingList.save();
  response.json(readingList);
});

export default router;
