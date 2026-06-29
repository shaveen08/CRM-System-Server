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

// Create new contact
const newContact = async (req, res) => {
  try {
    const user = await Contacts.create(req.body);
    res.status(201).json({
      success: true,
      message: "New user added successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user
const updateContact = async (req, res) => {
  try {
    const update = await Contacts.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!update) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contacts.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getContacts, newContact, updateContact, deleteContact };
