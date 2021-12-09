//user table model
module.exports = (sequelize: any, DataType: any) => {
  const User = sequelize.define("LogUser", {
    name: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
    },
    password: {
      type: DataType.STRING,
    },
  });
  return User;
};
