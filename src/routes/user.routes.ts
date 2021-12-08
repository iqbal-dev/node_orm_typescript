const user = require("../controllers/user.controller.ts");
const userRouter = require("express").Router();
//singup for new user
userRouter.post("/signup", user.singUp);
//log in for existing user
userRouter.post("/signin", user.singIn);
//history of logged in user
userRouter.get("/logged", user.loggedInUser);
module.exports = userRouter;
