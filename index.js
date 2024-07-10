const express = require("express");
const fs = require("fs");
const PORT = 20024;
const users = require("./MOCK_DATA.json");
const { json } = require("body-parser");

const app = express();

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

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    console.log("Hello");
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        user = { id: user.id, ...body };
      }
      return user;
    });
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(updatedUsers),
      (err, data) => {
        return res.json({ status: "Success", id: id });
      }
    );
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.json({ status: "Pending..." });
  });

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  users.push({ id: users.length + 1, ...newUser });
  console.log(users.length);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
