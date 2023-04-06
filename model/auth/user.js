module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.DataTypes.ENUM("admin", "user"),

      defaultValue: "user",
    },
    password: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue:
        "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    },
  });

  return User;
};
