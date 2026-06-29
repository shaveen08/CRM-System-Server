const express = require("express");
const router = express.Router();

const {
  getAppointments,
  newAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentsController");

router.get("/", getAppointments);
router.post("/", newAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
