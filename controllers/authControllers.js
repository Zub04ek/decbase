const { asyncWrapper } = require("../utils/asyncWrapper");
const {
  signupService,
  loginService,
  logoutService,
} = require("../services/authServices");

const signup = asyncWrapper(async (req, res) => {
  const user = await signupService(req.body);
  res.status(201).json(user);
});

const login = asyncWrapper(async (req, res) => {
  const { user, accessToken } = await loginService(req.body);
  res.json({ accessToken, user });
});

const logout = asyncWrapper(async (req, res) => {
  const { _id } = req.user;
  await logoutService(_id);
  res.status(200).json({
    message: "Logout success",
  });
});

module.exports = {
  signup,
  login,
  logout,
};
