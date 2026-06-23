const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["call", "email", "meeting", "note", "task"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    relatedTo: {
      type: String,
      enum: ["lead", "contact", "deal", "account"],
    },
    assignedTo: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Activity", activitySchema);
