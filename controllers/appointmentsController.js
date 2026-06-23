const Appointments = require("../models/appointmentsSchema");

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.find();
    res.status(200).json({
      success: true,
      message: "Appointment data retrived",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAppointments };
