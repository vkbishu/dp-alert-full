'use strict';
const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const admin_token = req.body.token || req.query.token || req.headers["adm-access-token"];

  if (!token && !admin_token) {
    return res.fail(null, "A token is required for authentication", 403);
  }
  try {
    if(token){
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = decoded;
    }
    if(admin_token){
        const decoded = jwt.verify(admin_token, config.SECRET_KEY);
        req.admin = decoded;
    }
  } catch (err) {
    return res.fail(null, "Invalid token", 401);
  }
  return next();
};

module.exports = verifyToken;