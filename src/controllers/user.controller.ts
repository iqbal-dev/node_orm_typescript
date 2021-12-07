const userdb = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = userdb.users;
const LoggedInUser = userdb.loggedInUser;
const Tutorials = userdb.tutorials;
const op = userdb.Sequelize.Op;

exports.singUp = async (req: any, res: any) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    console.log("user");
    if (existingUser) {
      return res.status(400).send("User is already exist");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const data = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ email: data.email, id: data.id }, "test", {
      expiresIn: "1h",
    });
    res.status(201).send({ token, data });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

exports.singIn = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    console.log("user");

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      "test",
      { expiresIn: "1h" }
    );
    await LoggedInUser.create({ email });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.loggedInUser = async (req: any, res: any) => {
  try {
    const data = await LoggedInUser.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
