/** Authentication check */

const jwts = require("jsonwebtoken");

module.exports = async (req: any, res: any, next:any) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
        let decodedData;
        
        
      if (token && isCustomAuth) {
        decodedData = jwts.verify(token, "test");
          req.userId = decodedData?.id;
          console.log(req.userId);
          
      } else {
        decodedData = jwts.decode(token);
        req.userId = decodedData?.sub;
      }
      next();
    } catch (error:any) {
        res.status(401).send("Access denied, No token provided");
    }
  };