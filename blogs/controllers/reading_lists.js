import express from "express";

import { ReadingList } from "../models/index.js";

const router = express.Router();

router.post("/", async (request, response) => {
  await ReadingList.create(request.body);
  response.status(201).end();
});

export default router;
