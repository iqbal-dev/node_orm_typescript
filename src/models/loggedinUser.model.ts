
//model for logged in user history table;
module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("LoggedInUser", {
    email: {
      type: Sequelize.STRING,
    },
    loginTime: {
      type: Sequelize.STRING,
    }
  });
  return User;
};
