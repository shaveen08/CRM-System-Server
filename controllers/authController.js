const Users = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({ message: "Invalid fields" });
    }

    const getUser = await Users.findOne({ email: email });
    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, getUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: getUser._id, role: getUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: getUser._id,
        name: getUser.name,
        email: getUser.email,
        role: getUser.role,
        department: getUser.department,
        status: getUser.status,
        access: getUser.access,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { login };
