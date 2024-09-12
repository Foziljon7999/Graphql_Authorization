const { mongoose } = require("mongoose");

const mongo = () => {
  return mongoose.connect("mongodb://localhost:27017/authorization");
};

module.exports = mongo;
