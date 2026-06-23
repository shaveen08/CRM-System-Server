const Activity = require("../models/activitySchema");

// Get all activities
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.find();
    res.status(200).json({
      success: true,
      message: "Retrived activity data",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getActivity };
