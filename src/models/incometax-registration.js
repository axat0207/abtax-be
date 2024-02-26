import mongoose, { Schema } from "mongoose";

const incomeTaxRegistrationSchema = new Schema({
  userType: {
    type: String,
    required: [true, "User type selection is required"],
    // enum: ['Individual', 'Company', 'HUF', 'Other'], // Replace with actual user types available
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  aadharNumber: {
    type: String,
    required: [true, "Aadhar number is required"],
    match: [/^\d{12}$/, "Please fill a valid Aadhar number"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    // enum: ['Male', 'Female', 'Other'], // Replace with actual gender options available
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  stateUT: {
    type: String,
    required: [true, "State/UT is required"],
    // Add enum if there are predefined options for states/UT
  },
  villageTownTehsilSubDivision: {
    type: String,
    required: [true, "Village/Town/Tehsil/Sub Divisional is required"],
  },
  panNumber: {
    type: String,
    required: [true, "PAN number is required"],
    match: [/^[A-Z]{5}\d{4}[A-Z]$/, "Please fill a valid PAN number"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Please fill a valid phone number"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  pinCode: {
    type: String,
    required: [true, "Pin code is required"],
    match: [/^\d{6}$/, "Please fill a valid pin code"],
  },
  bankName: {
    type: String,
    required: [true, "Bank name is required"],
  },
  bankAccountNumber: {
    type: String,
    required: [true, "Bank account number is required"],
  },
  ifscNumber: {
    type: String,
    required: [true, "IFSC number is required"],
    match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please fill a valid IFSC code"],
  },
  panCardUpload: {
    type: String,
    required: [true, "PAN card upload is required"],
    // File handling logic required
  },
  aadharCardUpload: {
    type: String,
    required: [true, "Aadhar card upload is required"],
    // File handling logic required
  },
  bankPassbookUpload: {
    type: String,
    required: [true, "Bank passbook upload is required"],
    // File handling logic required
  },
  termsAndConditions: {
    type: Boolean,
    required: [true, "Terms and conditions must be accepted"],
  },
  isPaid : {
    type : Boolean
  }
}, {
  timestamps: true,
});

export const incomeTaxRegistration = mongoose.model("income-tax-registration", incomeTaxRegistrationSchema);
