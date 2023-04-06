module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    totalAmount: {
      type: Sequelize.STRING,
    },
    paymentStatus: {
      type: Sequelize.STRING,
      defaultValue: "unpaid",
    },
  });
  return Order;
};
