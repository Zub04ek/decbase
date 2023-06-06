require("dotenv").config();
const { app } = require("./app");

app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
