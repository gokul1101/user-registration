const User = require("../models/User");

const createUserService = async (userDetails) => {
  let { email } = userDetails;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return Promise.reject({
        status: 403,
        message: "User already exists.",
      });
    }
    let newUser = new User(userDetails);
    await newUser.save();
    return Promise.resolve({
      status: 201,
      message: "User created Successfully.",
    });
  } catch (e) {
    console.log(e);
    return Promise.reject({
      status: 500,
      message: "Error in creating user.",
    });
  }
};
const getAllUserService = async () => {
  try {
    let users = await User.find({});
    return Promise.resolve({
      status: 200,
      message: "Users found",
      users,
    });
  } catch (e) {
    console.log(e);
    return Promise.reject({
      status: 500,
      message: "Error in getting users.",
    });
  }
};
const deleteUserService = async (id) => {
  try {
    let user = await User.findByIdAndDelete(id);
    if (user)
      return Promise.resolve({
        status: 202,
        message: "User deleted Successfully.",
      });
    return Promise.reject({
      status: 404,
      message: "User not found",
    });
  } catch (e) {
    console.log(e);
    return Promise.reject({
      status: 500,
      message: "Error in deleting user.",
    });
  }
};

module.exports = {
  createUserService,
  getAllUserService,
  deleteUserService,
};
