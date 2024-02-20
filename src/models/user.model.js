import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      // unique: true,
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      // unique: true,
      trim: true,
      index: true,
    },
    phoneNumber : {
      type : String,
      unique : true,
      index : true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
