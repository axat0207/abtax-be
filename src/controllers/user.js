import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res
        .status(400)
        .send({ message: "Email, fullName, and password are required." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .send({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await user.save();

    user.password = undefined;

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error while registering user." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    res.status(400).json({ message: "password is required" });
  }
  try {
    const user = await User.findOne({
      $or: [{ email }],
    });

    if (!user) {
      return res.status(401).json({ message: "User does not exist!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    await user.save({ validateBeforeSave: false });
    const loggedInUser = await User.findById(user._id);
      console.log(process.env.ACCESS_TOKEN_EXPIRY)
    return res.status(200).json({
      message: "User logged In Successfully",
      loggedInUser,
      accessToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Srver Error" });
  }
};

const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " + error });
  }
};

const changeCurrentPassword = async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide a valid password." });
  }
  const hashNewPassword = await bcrypt.hash(newPassword, 10);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          password: hashNewPassword,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const checkUpdatedPassword = await User.findById(req.user?._id);

    res.status(200).json({ message: "Password change sucessfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(400).json({ message: "User Not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerUser, login, logout, changeCurrentPassword, getUser };
