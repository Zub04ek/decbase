class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message || defaultErrorMessage[statusCode]);
    this.statusCode = statusCode;
  }
}

const defaultErrorMessage = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
  500: "Server error",
};

module.exports = {
  HTTPError,
};
