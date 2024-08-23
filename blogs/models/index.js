import Blog from "./blog.js";
import User from "./user.js";

Blog.sync({ alter: true });
User.sync({ alter: true });

export { Blog, User };
