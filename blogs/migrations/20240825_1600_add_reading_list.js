import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("reading_list", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("reading_list");
};

export { up, down };
