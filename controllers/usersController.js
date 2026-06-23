const Users = require("../models/usersSchema");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      success: true,
      message: "Retrived users data",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getUsers };
