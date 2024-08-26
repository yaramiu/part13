import Blog from "./blog.js";
import User from "./user.js";
import ReadingList from "./readinglist.js";
import Session from "./session.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList });

Session.belongsTo(User);

export { Blog, User, ReadingList, Session };
