const express = require("express");
const userRouter = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../controller/user");

userRouter.get("/", handleGetAllUsers);

userRouter
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

userRouter.post("/", handleCreateUser);

module.exports = userRouter;
