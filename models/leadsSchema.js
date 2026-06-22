const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      enum: ["Website", "Instagram", "LinkedIn", "Referral"],
      default: "Website",
    },
    status: {
      type: String,
      enum: ["Completed", "Pending", "Confirmed", "Dropped"],
      default: "Pending",
    },
    dealValue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Leads", leadsSchema);
