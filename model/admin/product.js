module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    image: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    mg: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    manufacturer: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
  });
  return Product;
};
