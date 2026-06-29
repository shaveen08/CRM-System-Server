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

// Create Appointments
const newAppointment = async (req, res) => {
  try {
    const appointment = await Appointments.create(req.body);

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Appointments
const updateAppointment = async (req, res) => {
  try {
    const update = await Appointments.findByIdAndUpdate(
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
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Appointments
const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointments.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAppointments,
  newAppointment,
  updateAppointment,
  deleteAppointment,
};
