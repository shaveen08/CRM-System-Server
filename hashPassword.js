require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Users = require("./models/usersSchema");
const connectDB = require("./config/db");

const hashExistingPasswords = async () => {
  await connectDB();

  const users = await Users.find({});

  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    await Users.updateOne({ _id: user._id }, { password: hashed });
    console.log(`✅ Hashed password for: ${user.email}`);
  }

  console.log("Done!");
  process.exit();
};

hashExistingPasswords();