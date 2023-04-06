module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    name: {
      type: Sequelize.STRING,
    },
    specialist: {
      type: Sequelize.DataTypes.ENUM(
        "dentist",
        "dermatologist",
        "nuero surgeon",
        "physician",
        "psychiatry"
      ),
    },
    date: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.DataTypes.ENUM("male", "female", "others"),
    },
    appoinmentStatus: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
  });
  return Appointment;
};
