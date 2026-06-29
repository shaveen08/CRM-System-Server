const express = require("express");

const router = express.Router();

const {
  getActivity,
  newActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

router.get("/", getActivity);
router.post("/", newActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
