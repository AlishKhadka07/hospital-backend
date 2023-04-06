module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    image: {
      type: Sequelize.STRING,
    },
  });
  return Category;
};
