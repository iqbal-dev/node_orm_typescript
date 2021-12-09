const user = require("../controllers/user.controller.ts");
const userRouter = require("express").Router();
const auth = require("../middleware/auth.ts");
//singup for new user
 

/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.post("/signup", user.singUp);
//log in for existing user
userRouter.post("/signin", user.singIn);
//history of logged in user
userRouter.get("/logged",auth, user.loggedInUser);
//history of logged in user
userRouter.get("/search", user.userSearch);
module.exports = userRouter;
