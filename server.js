require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

app.use(express.json());
app.use(express.static('badges'));


app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/addPlayer", require("./routes/participant"));
app.use("/api/impression",require("./routes/impression"));
app.use("/api/adminImpression",require("./routes/adminImpression"));
app.use("/api/adminrecherche",require("./routes/adminrecherche"));
app.use("/api/downloadxls",require("./routes/downloadxls"));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
