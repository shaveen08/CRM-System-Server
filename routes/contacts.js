const express = require("express");
const router = express.Router();

const {
  getContacts,
  newContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactsController");

router.get("/", getContacts);
router.post("/", newContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
