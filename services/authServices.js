const bcrypt = require("bcrypt");

const { HTTPError } = require("../utils/HttpError");
const { User } = require("../models/User");
const { assignTokens } = require("../utils/assignTokens");

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

const loginService = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HTTPError(404, "User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new HTTPError(404, "Email or password is wrong");
  }
  const { accessToken, refreshToken } = assignTokens(user);
  await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
  return {
    accessToken,
    user,
  };
};

const logoutService = async (userId) => {
  await User.findByIdAndUpdate(userId, { refresh_token: null });
};

module.exports = {
  signupService,
  loginService,
  logoutService,
};
