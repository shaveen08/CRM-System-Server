const Activity = require("../models/activitySchema");

// Get all activities
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.find();
    res.status(200).json({
      success: true,
      message: "Retrieved activity data",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Acitivity
const newActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: activity,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Acitivity
const updateActivity = async (req, res) => {
  try {
    const update = await Activity.findByIdAndUpdate(
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
        message: "Activity not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Activity
const deleteActivity = async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Activity removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getActivity, newActivity, updateActivity, deleteActivity };
