const notFoundHandler = async (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
};

module.exports = {
  notFoundHandler,
};
