import mongoose, { Schema } from "mongoose";

const gstRegistrationSchema = new Schema({
  userType: {
    type: String,
    required: [true, "User type is required"],
    enum: ['Tax Payer', 'GST Practitioner', 'Tax Deductor', 'Other'], // Add all user types available
  },
  panOrAadharName: {
    type: String,
    required: [true, "PAN or Aadhar name is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    // enum: ['Male', 'Female', 'Other'], // Add all gender options available
  },
  panNumber: {
    type: String,
    required: [true, "PAN number is required"],
    // match: [/^[A-Z]{5}\d{4}[A-Z]$/, "Please fill a valid PAN number"],
  },
  aadharNumber: {
    type: String,
    required: [true, "Aadhar number is required"],
    // match: [/^\d{12}$/, "Please fill a valid Aadhar number"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    // match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    // match: [/^\d{10}$/, "Please fill a valid mobile number"],
  },
  businessPurpose: {
    type: String,
    required: [true, "Business purpose is required"],
    // Add enum if there are predefined options
  },
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  indianState: {
    type: String,
    required: [true, "Indian state is required"],
    // Add enum if there are predefined options for states
  },
  districtCity: {
    type: String,
    required: [true, "District/City is required"],
  },
  subDivisionTehsil: {
    type: String,
    required: [true, "Sub Division/Tehsil is required"],
  },
  pinCode: {
    type: String,
    required: [true, "Pin code is required"],
    // match: [/^\d{6}$/, "Please fill a valid pin code"],
  },
  wardNumberVillage: {
    type: String,
    required: [true, "Ward Number/Village is required"],
  },
  stateUT: {
    type: String,
    required: [true, "State/UT is required"],
    // Add enum if there are predefined options for states/UT
  },
  aadharCardFile: {
    type: String,
    // File handling logic required
  },
  panCardFile: {
    type: String,
    // File handling logic required
  },
  passportPhotoFile: {
    type: String,
    // File handling logic required
  },
  electricityBillFile: {
    type: String,
    // Optional, file handling logic required
  },
  ownershipDocumentShopFile: {
    type: String,
    required: [true, "Ownership document shop is required"],
    // File handling logic required
  },
  gumastaMsmeKhasraElectricityBillFile: {
    type: String,
    required: [true, "Gumasta/MSME/Khasra/Electricity bill is required"],
    // File handling logic required
  },
  bankDetailsFile: {
    type: String,
    required: [true, "Bank details are required"],
    // File handling logic required
  },
}, {
  timestamps: true,
});

export const gstRegistration = mongoose.model("gst-registration", gstRegistrationSchema);
