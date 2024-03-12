const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const router = require("./routes/index");
const morgan = require("morgan");

dotenv.config();

// conect to database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(helmet());
app.use(morgan("dev"));

app.use(router);

// listen to the server using port 8000
app.listen(8000, () => {
  console.log("server is running");
});
