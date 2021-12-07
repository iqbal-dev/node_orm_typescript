module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("LogUser", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    confirmPassword: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
