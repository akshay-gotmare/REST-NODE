const express = require("express");
const fs = require("fs");
const PORT = 20024;
const users = require("./MOCK_DATA.json");
const { json } = require("body-parser");

const mongoose = require("mongoose");
const { type } = require("os");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/user-data-app")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("MongoDB Connection error:", err));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Inside Middelware 1");
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.use((req, res, next) => {
  console.log("Inside Middleware 2");
  next();
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    // const user = await User.find({ _id: id });
    const user = await User.findById({ _id: id });
    return res.json(user);
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstName: "Updated",
    });
    console.log(updatedUser);
    return res.json({ status: "Success", id: id, body: updatedUser });
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({
      status: "success",
      message: "delete success",
      id: id,
      body: deletedUser,
    });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log(body);

  if (
    body &&
    body.first_name &&
    body.last_name &&
    body.email &&
    body.gender &&
    body.job_title
  ) {
    const newUser = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
    console.log(newUser);
    return res.status(201).json({ status: "success" });
  } else {
    return res
      .status(401)
      .json({ status: "failed", message: "some data is missing.." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
