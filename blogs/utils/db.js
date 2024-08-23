import { Sequelize } from "sequelize";

import { DATABASE_URL } from "./config.js";

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.error("error connecting to database");
  }
};

export { sequelize, connectToDatabase };
