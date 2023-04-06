module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
    amount: {
      type: Sequelize.INTEGER,
    },
  });
  return Payment;
};
