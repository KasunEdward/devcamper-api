const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//Route files
const bootcamps = require("./routes/bootcamps");
const auth = require("./routes/auth");

// Load Env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//file upload 
app.use(fileupload());

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
