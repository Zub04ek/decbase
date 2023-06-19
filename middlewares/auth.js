const { HTTPError } = require("../utils/HttpError");
const { User } = require("../models/User");
const { assignTokens } = require("../utils/assignTokens");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(new HTTPError(401, "Invalid or absent token"));
  }
  const decodedPayload = jwt.decode(token);
  let fetchedUser;
  try {
    fetchedUser = await User.findById(decodedPayload.userId);
    if (!fetchedUser || !fetchedUser.refresh_token) {
      throw new HTTPError(401, "User not found or no refresh token");
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = fetchedUser;
    next();
  } catch (err) {
    try {
      if (err?.name !== "TokenExpiredError") {
        return next(new HTTPError(401));
      }
      jwt.verify(fetchedUser.refresh_token, REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken } = assignTokens(fetchedUser);
      await User.findByIdAndUpdate(fetchedUser._id, { refreshToken });

      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      next(new HTTPError(401, "Refresh token is expired"));
    }
  }
};

module.exports = {
  auth,
};
