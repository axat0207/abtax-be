import mongoose, { Schema } from "mongoose";
const cartSchema = new Schema(
  {
    userId : {
      type : String,
    },
    formType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
