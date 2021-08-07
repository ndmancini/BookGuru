const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  
  if (!req.headers.authorization) return res.status(401).send("Missing token");

  const token = req.headers.authorization.split(" ")[1];

  const data = jwt.verify(token, "fidelio");

  if (data) {
    req.user = data;
    next();
  } else {
    return res.status(401).send("You don't have access here");
  }
};

module.exports = checkJWT;
