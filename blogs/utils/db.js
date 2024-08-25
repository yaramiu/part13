import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

import { DATABASE_URL } from "./config.js";

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to database");
  } catch (error) {
    console.error("error connecting to database");
  }
};

const migrationConfig = {
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((migration) => migration.name),
  });
};

const dropMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};

export { sequelize, connectToDatabase, dropMigration };
