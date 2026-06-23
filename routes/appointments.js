const express = require("express");
const router = express.Router();

const { getAppointments } = require("../controllers/appointmentsController");

router.get("/", getAppointments);

module.exports = router;
