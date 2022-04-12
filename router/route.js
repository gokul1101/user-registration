const {
  createUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/user/create", createUser);
router.get("/user/get/all", getAllUsers);
router.post("/user/delete", deleteUser);

module.exports = router;
