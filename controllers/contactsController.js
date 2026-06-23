const Contacts = require("../models/contactsSchema");

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json({
      success: true,
      message: "Data retrieved",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getContacts };
