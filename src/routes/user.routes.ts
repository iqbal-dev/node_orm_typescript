const user = require("../controllers/user.controller.ts");
const userRouter = require("express").Router();

userRouter.post("/", user.singUp);
userRouter.post("/signin", user.singIn);
userRouter.get("/logged", user.loggedInUser);
module.exports = userRouter;
