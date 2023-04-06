module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    quantity: {
      type: Sequelize.STRING,
    },
  });
  return Cart;
};
