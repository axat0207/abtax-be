import mongoose, { Schema } from "mongoose";

const billingDetailSchema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "Name type is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    companyName: {
      type: String,
    },
    streetAddress: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "state is required"],
    },

    pinCode: {
      type: String,
      required: [true, "Pin code is required"],
      match: [/^\d{6}$/, "Please fill a valid pin code"],
    },

    country: {
      type: String,
      required: [true, "State/UT is required"],
    },
    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const billingDetail = mongoose.model(
  "billing-detail",
  billingDetailSchema
);
