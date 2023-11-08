const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // The dialect for MySQL is 'mysql'
    logging: false, // Set to 'true' to see SQL logs
    define: {
      paranoid: true,
    },
  }
);

async function init() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    throw err;
  }
}
init();

(async () => {
  await sequelize.sync({ alter: false });
})();

module.exports = sequelize;
