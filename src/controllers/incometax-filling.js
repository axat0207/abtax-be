import { itr } from "../models/incometax-filling.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const itrFilling = async (req, res) => {
  const { itrSelectFile, selectWord, panId, password, email, mobileNumber } =
    req.body;

  try {
    if (
      [itrSelectFile, selectWord, panId, password, email, mobileNumber].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    const aadharCardPath = req.files?.aadharCard?.[0]?.path;
    const bankAccountPath = req.files?.bankAccount?.[0]?.path;
    const form16GovPath = req.files?.form16Gov?.[0]?.path;

    if (!aadharCardPath || !bankAccountPath || !form16GovPath) {
      return res.status(400).json({ message: "All files are required." });
    }

    const aadharCard = await uploadOnCloudinary(aadharCardPath);
    const bankAccount = await uploadOnCloudinary(bankAccountPath);
    const form16Gov = await uploadOnCloudinary(form16GovPath);

    const setItr = await itr.create({
      itrSelectFile,
      selectWord,
      panId,
      password,
      email,
      mobileNumber,
      isPaid : false,
      aadharCard: aadharCard?.url || "",
      bankAccount: bankAccount?.url || "",
      form16Gov: form16Gov?.url || "",
    });

    return res.status(201).json(setItr);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getItrData = async (req, res) => {
  try {
      const ItrRecords = await itr.find({ isPaid: false }); // Retrieve all records where isPaid is false

      if (ItrRecords.length === 0) {
          return res.status(404).json({ message: "No unpaid ITR records found." });
      }

      return res.status(200).json(ItrRecords);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};


export { itrFilling, getItrData};
