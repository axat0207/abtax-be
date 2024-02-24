import mongoose, { Schema } from "mongoose";

const incomeTaxSchema = new Schema({
  itrSelectFile: {
    type: String,
    required: [true, "ITR select file is required"],
  },
  panId: {
    type: String,
    required: [true, "PAN ID is required"],
    match: [/^[A-Z]{5}\d{4}[A-Z]$/, "Please fill a valid PAN number"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
  },
  aadharCard: {
    type: String,
  },
  tdsOption: {
    type: String,
    // enum: ["TDS Return", "Yes", "No"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Please fill a valid mobile number"],
  },
  bankAccount: {
    type: String,
  },
  form16Gov: {
    type: String,
  },
}, {
  timestamps: true,
});

export const itr = mongoose.model("income-tax", incomeTaxSchema);
