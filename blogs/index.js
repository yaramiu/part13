import "dotenv/config";
import express from "express";
import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);
Blog.sync();

const app = express();

app.use(express.json());

app.get("/api/blogs", async (_request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

app.post("/api/blogs", async (request, response) => {
  try {
    const createdBlog = await Blog.create(request.body);
    return response.json(createdBlog);
  } catch (error) {
    return response.status(400).end();
  }
});

app.delete("/api/blogs/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.destroy({ where: { id } });
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
