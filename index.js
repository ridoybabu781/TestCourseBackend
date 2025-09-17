const app = require("./src/app");
const { database } = require("./src/config");
require("dotenv").config();

database();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port :${process.env.PORT}`);
});
