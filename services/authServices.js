const bcrypt = require("bcrypt");

const { HTTPError } = require("../utils/HTTPError");
const { User } = require("../models/User");

const signupService = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HTTPError(409, "Email should be unique");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  return await User.create({
    ...body,
    password: hashedPassword,
  });
};

const loginService = async () => {};

const logoutService = async () => {};

module.exports = {
  signupService,
  loginService,
  logoutService,
};
