const { HTTPError } = require("../HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HTTPError(422, `${error}`));
    }
    next();
  };
};

module.exports = {
  validateBody,
};
