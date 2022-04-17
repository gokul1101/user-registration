const {
  createUserService,
  getAllUserService,
  deleteUserService,
} = require("../services/userService");

const createUser = async (req, res) => {
  const userDetails = req.body;
  try {
    let { status, ...data } = await createUserService(userDetails);
    return res.status(status).json(data);
  } catch ({ status = 500, message = "Internal Server Error" }) {
    return res.status(status).send(message);
  }
};
const getAllUsers = async (req, res) => {
  try {
    let { status, ...data } = await getAllUserService();
    return res.status(status).send(data);
  } catch ({ status = 500, message = "Internal Server Error" }) {
    return res.status(status).send(message);
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    let { status, message } = await deleteUserService(id);
    return res.status(status).send(message);
  } catch ({ status = 500, message = "Internal Server Error" }) {
    return res.status(status).send(message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
};
