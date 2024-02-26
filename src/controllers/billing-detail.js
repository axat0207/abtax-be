import { billingDetail } from "../models/billing-detail.js";
import {gstFiling} from "../models/gst-filling.js"
const billingDetails = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    streetAddress,
    city,
    state,
    pinCode,
    country,
    phoneNumber,
    email,
    message,
    product,
    price,
  } = req.body;

  try {
    const newBillingDetail = await billingDetail.create({
      firstName,
      lastName,
      companyName,
      streetAddress,
      city,
      state,
      pinCode,
      country,
      phoneNumber,
      email,
      message,
      product,
      price,
    });

    return res.status(201).json(newBillingDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBillingDetails = async (req, res) => {
  const { email } = req.user;
  if (!email) {
    return res
      .status(400)
      .json({
        message: "Email is required for fetching GST registration details.",
      });
  }

  try {
    const details = await billingDetail.find({ email });
    if (!details) {
      return res
        .status(404)
        .json({
          message: "GST registration details not found for the provided email.",
        });
    }
    return res.status(200).json(details);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { billingDetails, getBillingDetails };
