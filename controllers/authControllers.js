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

const logout = asyncWrapper(async (req, res) => {});

module.exports = {
  signup,
  login,
  logout,
};
