const { User } = require("../model/userModel");
const handleGetAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
};

const handleGetUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // const user = await User.find({ _id: id });
  const user = await User.findById({ _id: id });
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  const id = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(id, {
    firstName: "Updated",
  });
  console.log(updatedUser);
  return res.json({ status: "Success", id: id, body: updatedUser });
};

const handleDeleteUserById = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await User.findByIdAndDelete(id);
  res.json({
    status: "success",
    message: "delete success",
    id: id,
    body: deletedUser,
  });
};

const handleCreateUser = async (req, res) => {
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
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
};
