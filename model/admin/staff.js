module.exports = (sequelize, Sequelize) => {
  const Staff = sequelize.define("staff", {
    image: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
  });
  return Staff;
};
