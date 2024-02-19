const asynHander = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynHander(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRETY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next()
    if(!token)
    {
        res.status(401)
        throw new Error("Token is not provided");
    }
    });
  }
});
module.exports = validateToken;