import { billingDetail } from "../models/billing-detail.js";
import { gstFiling } from "../models/gst-filling.js";
import { gstRegistration } from "../models/gst-registration.js";
import { itr } from "../models/incometax-filling.js";
import { incomeTaxRegistration } from "../models/incometax-registration.js";
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
    productId, // Make sure this ID is being sent in the body of your request
  } = req.body;

  try {
    // Based on the product, update the corresponding document's isPaid status
    // await gstFiling.findByIdAndUpdate(productId, {isPaid : true});
    
    switch (product) {
      case 'gstFilling':
        await gstFiling.findByIdAndUpdate(productId, { isPaid: true });
        break;
      case 'gstRegistration':
        await gstRegistration.findByIdAndUpdate(productId, { isPaid: true });
        break;
      case 'itrFilling':
        await itr.findByIdAndUpdate(productId, { isPaid: true });
        break;
      case 'itrRegistration':
        await incomeTaxRegistration.findByIdAndUpdate(productId, { isPaid: true });
        break;
      default:
        // If the product type does not match any case, you can choose to do nothing or handle it appropriately
        console.log("Product type does not match any case.");
        break;
    }

    // Create a new billing detail record
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

    // Return the newly created billing detail
    return res.status(201).json(newBillingDetail);
  } catch (error) {
    // If there's an error, return a 500 status code and the error message
    return res.status(500).json({ message: error.message });
  }
};


const getBillingDetails = async (req, res) => {
  const { email } = req.user;
  if (!email) {
    return res.status(400).json({
      message: "Email is required for fetching GST registration details.",
    });
  }

  try {
    const details = await billingDetail.find({ email });
    if (!details) {
      return res.status(404).json({
        message: "GST registration details not found for the provided email.",
      });
    }
    return res.status(200).json(details);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { billingDetails, getBillingDetails };
