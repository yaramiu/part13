import Blog from "./blog.js";
import User from "./user.js";
import ReadingList from "./readinglist.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList });

export { Blog, User, ReadingList };
