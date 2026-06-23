const express = require("express");
const router = express.Router();

const { getContacts } = require("../controllers/contactsController");

router.get("/", getContacts);

module.exports = router;
