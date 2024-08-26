import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("users", "disabled", {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
  await queryInterface.createTable("sessions", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("users", "disabled");
  await queryInterface.dropTable("sessions");
};

export { up, down };
