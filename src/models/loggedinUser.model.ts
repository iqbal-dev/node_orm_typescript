module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("LoggedInUser", {
    email: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
