import express from "express";

import blogsRouter from "./controllers/blogs.js";

import { connectToDatabase } from "./utils/db.js";
import { PORT } from "./utils/config.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);

await connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
