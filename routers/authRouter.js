const express = require("express");
const { signup, login, logout } = require("../controllers/authControllers");
const { validateBody } = require("../utils/validation/validateBody");
const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../utils/validation/authValidationSchemas");

const router = express.Router();

router.post("/signup", validateBody(createUserValidationSchema), signup);
router.post("/login", validateBody(loginValidationSchema), login);
router.post("/logout", logout);

module.exports = {
  authRouter: router,
};
