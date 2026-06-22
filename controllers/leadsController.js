const Leads = require("../models/leadsSchema");

// GET All Leads
const getLeads = async (req, res) => {
  try {
    const leads = await Leads.find();
    res.status(200).json({
      success: true,
      message: "Retrived all data",
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Leads
const createLeads = async (req, res) => {
  try {
    const newLead = await Leads.create(req.body);
    res.status(201).json({
      success: true,
      message: "Data saved",
      data: newLead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Leads
const updateLead = async (req, res) => {
  try {
    const update = await Leads.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!update) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Lead
const deleteLead = async (req, res) => {
  try {
    const deleted = await Leads.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getLeads, createLeads, updateLead, deleteLead };
