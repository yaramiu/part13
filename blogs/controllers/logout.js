import express from "express";

import { Session } from "../models/index.js";

import { checkSessionValidity, tokenDecoder } from "../utils/middleware.js";

const router = express.Router();

router.delete(
  "/",
  tokenDecoder,
  checkSessionValidity,
  async (request, response) => {
    const session = await Session.findByPk(request.decodedToken.id);
    if (session) {
      await session.destroy();
    }
    response.status(204).end();
  }
);

export default router;
