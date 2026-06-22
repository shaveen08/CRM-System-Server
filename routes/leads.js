const express = require("express");
const router = express.Router();

const { getLeads, createLeads, updateLead, deleteLead } = require("../controllers/leadsController");

router.get("/", getLeads);
router.post("/", createLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
