import express from "express";
import "express-async-errors";

import blogsRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import authorsRouter from "./controllers/authors.js";
import readingListsRouter from "./controllers/readinglists.js";

import { connectToDatabase } from "./utils/db.js";
import { PORT } from "./utils/config.js";
import { errorHandler } from "./utils/middleware.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);

app.use(errorHandler);

await connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
