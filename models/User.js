const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const User = model("user", userSchema);

module.exports = {
  User,
};
