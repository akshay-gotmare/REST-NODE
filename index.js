const express = require("express");
const { connectMongoDB } = require("./connection");
const { generateLogs } = require("./middleware");
const userRouter = require("./routes/userRouter");
const app = express();
const PORT = 20024;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/user-data-app")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(`MongoDB not connect. Facing Error : ${err}`));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(generateLogs("log.txt"));

// Routes
app.use("/api/users", userRouter);

// Listener
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
