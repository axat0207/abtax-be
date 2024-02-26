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
    productId
  } = req.body;

  try {
  
    const he = await gstFiling.findOneAndUpdate({ productId : productId}, { isPaid: true }, { new: true });
    console.log(he+ "  hoofgy");
 
console.log(productId + " this is produt")
    // switch (product) {
    //   case 'gstFiling':
    //     console.log(productId)
    //     const he = await gstFiling.findOneAndUpdate({ productId : productId}, { isPaid: true }, { new: true });
    //     console.log(he+ "  hoofgy");
    //     break;
    //   case 'gstRegistration':
    //     await gstRegistration.findOneAndUpdate({ productId : productId}, { isPaid: true }, { new: true });
    //     break;
    //   case 'itrFilling':
    //     await itr.findOneAndUpdate({ productId : productId}, { isPaid: true }, { new: true });
    //     break;
    //   case 'itrRegistration':
    //     await incomeTaxRegistration.findOneAndUpdate({ productId : productId}, { isPaid: true }, { new: true });
    //     break;
    // }

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
