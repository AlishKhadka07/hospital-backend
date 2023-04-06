module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("doctor", {
    image: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.DataTypes.ENUM(
        "dentist",
        "dermatologist",
        "nuero surgeon",
        "physician",
        "psychiatry"
      ),
    },
    apointment_charge: {
      type: Sequelize.STRING,
    },
    qualification: {
      type: Sequelize.STRING,
    },
  });
  return Doctor;
};
