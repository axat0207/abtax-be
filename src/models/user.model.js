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
    },
    lastName: {
      type: String,
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
