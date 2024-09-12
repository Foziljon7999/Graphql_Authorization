const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required:true
    },
    userName: {
      type: String,
      required:true

    },
    password: {
      type: String,
      required:true

    },
  },
  {
    collection: "users",
  }
);

module.exports = model("User", userSchema);


