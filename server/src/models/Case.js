import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    severity: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    pendingDays: {
      type: Number,
      min: 0,
      required: true
    },
    peopleAffected: {
      type: Number,
      min: 1,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Closed"],
      default: "Pending"
    },
    hearingDate: {
      type: Date,
      default: null
    },
    priorityScore: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Case", caseSchema);
