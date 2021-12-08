const userdb = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = userdb.users;
const LoggedInUser = userdb.loggedInUser;
const Tutorials = userdb.tutorials;
const op = userdb.Sequelize.Op;
//singUp for new user
exports.singUp = async (req: any, res: any) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(req.body);
  //log in time
  const loginTime = new Date().toLocaleString();
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    //check password and confirm password is matched or not
    if (password !== confirmPassword) return res.status(400).send({ message: "password is not matched" });
    //check the new user is exist or not
      if (existingUser) {
        return res.status(400).send("User is already exist");
    }
    //password hashing
    const hashPassword = await bcrypt.hash(password, 12);
    //create new user
      const data = await User.create({
        name,
        email,
        password: hashPassword,
      });
    //create log history
    await LoggedInUser.create({ email, loginTime })
    //create jwt token
      const token = jwt.sign({ email: data.email, id: data.id }, "test", {
        expiresIn: "1h",
      });
      res.status(201).send({ token, data });
    
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }

};
//singin for the user
exports.singIn = async (req: any, res: any) => {
  const { email, password } = req.body;
  //log in time
  const loginTime = new Date().toLocaleString();

  
  try {
    const existingUser = await User.findOne({where: { email: email}});
//check  existing user
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
//check existing user password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
//create new token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      "test",
      { expiresIn: "1h" }
    );
    //create log history for user
    await LoggedInUser.create({ email, loginTime: loginTime });
    console.log('user created');
    
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//get all the logged in users
exports.loggedInUser = async (req: any, res: any) => {
  try {
    const data = await LoggedInUser.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
