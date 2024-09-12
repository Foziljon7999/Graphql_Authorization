const jwt = require("jsonwebtoken");

const sign = (payload) => {
  return jwt.sign(payload, "number");
};

const verify = (token) => {
  return jwt.verify(token, "number");
};

module.exports = {
  sign,
  verify,
};
