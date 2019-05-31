const Sequelize = require("sequelize");

const sequelize = new Sequelize("soc-network", "abdo", process.env.DB_PASS, {
  dialect: "postgres"
})



const models = {
  User: sequelize.import("./user"),
  Post: sequelize.import("./post")
}


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;