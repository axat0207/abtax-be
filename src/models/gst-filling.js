import mongoose, { Schema } from "mongoose";

const gstFilingSchema = new Schema({
  userName: {
    type: String,
    required: [true, "GST ID is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
  },
  filingType: {
    type: String,
    required: [true, "Filing Type is required"],
    // enum: ["Monthly", "Quarterly", "Annually"], // Replace with actual filing types
  },
  nameOfSupplyGST: {
    type: String,
    required: [true, "Name of Supply GST is required"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Please fill a valid mobile number"],
  },
  supplyGSTNumber: {
    type: String,
    required: [true, "Supply GST Number is required"],
  },
  saleBill: {
    type: String,
    required: [true, "Sale Bill is required"],
  },
  otherBill: {
    type: String,
  },
  purchaseBill: {
    type: String,
    required: [true, "Purchase Bill is required"],
  },
  isPaid : {
    type : Boolean
  }
}, {
  timestamps: true,
});

export const gstFiling = mongoose.model("gst-filing", gstFilingSchema);
