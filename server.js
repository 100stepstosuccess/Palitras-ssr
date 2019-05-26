require("dotenv").config();
require("./config/base");
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(DB_URL, { useNewUrlParser: true, autoIndex: !IN_PROD })
  .then(() => console.log("Database is successfully connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`server runs on ${HOST}`));
