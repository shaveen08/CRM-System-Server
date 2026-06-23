const Lead = require("../models/leadsSchema");
const Contact = require("../models/contactsSchema");
const Activity = require("../models/activitySchema");
const Appointments = require("../models/appointmentsSchema");
const Users = require("../models/usersSchema");

const getDashboardData = async (req, res) => {
  try {
    const [
      totalLeads,
      totalContacts,
      totalActivities,
      totalAppointments,
      totalUsers,
    ] = await Promise.all([
      Lead.countDocuments(),
      Contact.countDocuments(),
      Activity.countDocuments(),
      Appointments.countDocuments(),
      Users.countDocuments(),
    ]);
    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        totalContacts,
        totalActivities,
        totalAppointments,
        totalUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

module.exports = { getDashboardData };
