import { Model, DataTypes } from "sequelize";

import { sequelize } from "../utils/db.js";

import { User } from "./index.js";

class Session extends Model {}

Session.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "session",
  }
);

export default Session;
