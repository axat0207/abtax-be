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
      isPaid : false,
      saleBill: saleBill?.url || "",
      otherBill: otherBill?.url || "",
      purchaseBill: purchaseBill?.url || "",
    });

    return res.status(201).json(setGstFiling);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};


const getGstData = async (req, res) => {
  try {
      const ItrRecords = await gstFiling.find({ isPaid: false }); // Retrieve all records where isPaid is false

      if (ItrRecords.length === 0) {
          return res.status(404).json({ message: "No unpaid ITR records found." });
      }

      return res.status(200).json(ItrRecords);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};


export { gstFilling, getGstData };
