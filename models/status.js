const mongoose = require("mongoose");
const validator = require("validator");

const saleStatus = new mongoose.Schema(
  {
    callbackDate: {
      type: String,
      trim: true
    },
    callbackTime: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: [
        "Transfer",
        "Pending",
        "Approved",
        "Kick Back",
        "Rejected",
        "Charged Back",
        "Call Back"
      ],
      default: "Pending"
    },
    statusCloser: {
      type: String,
      enum: [
        "Transfer",
        "Pending",
        "Approved",
        "Kick Back",
        "Rejected",
        "Charged Back",
        "Call Back"
      ],
      default: "Pending"
    },
    statusFromCloser: {
      type: String,
      enum: [
        "Transfer",
        "Pending",
        "Approved",
        "Kick Back",
        "Rejected",
        "Charged Back",
        "Call Back"
      ],
      default: "Pending"
    },
    _Agent: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // this would be true
      ref: "User"
    },
    _Closer: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // this would be true
      ref: "User"
    },

    transferDate: "28-6-2019"
  },
  { timestamps: true }
);

const SaleStatus = mongoose.model("SaleStatus", saleSchema);

module.exports = SaleStatus;
