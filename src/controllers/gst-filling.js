import { gstFiling } from "../models/gst-filling.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const gstFilling = async (req, res) => {
  const {
    userName,
    password,
    email,
    filingType,
    nameOfSupplyGST,
    mobileNumber,
    supplyGSTNumber,
  } = req.body;

  try {
    if (
      [
        userName,
        password,
        email,
        filingType,
        nameOfSupplyGST,
        mobileNumber,
        supplyGSTNumber,
      ].some((field) => !field || field.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const saleBillPath = req.files?.saleBill?.[0]?.path;
    const otherBillPath = req.files?.otherBill?.[0]?.path;
    const purchaseBillPath = req.files?.purchaseBill?.[0]?.path;

    if (!saleBillPath || !purchaseBillPath) {
      return res
        .status(400)
        .json({ message: "Sale Bill and Purchase Bill files are required." });
    }

    const saleBill = await uploadOnCloudinary(saleBillPath);
    const purchaseBill = await uploadOnCloudinary(purchaseBillPath);
    const otherBill = await uploadOnCloudinary(otherBillPath);

    const setGstFiling = await gstFiling.create({
      userName,
      password,
      email,
      filingType,
      nameOfSupplyGST,
      mobileNumber,
      supplyGSTNumber,
      saleBill: saleBill?.url || "",
      otherBill: otherBill?.url || "",
      purchaseBill: purchaseBill?.url || "",
    });

    return res.status(201).json(setGstFiling);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { gstFilling };
