import { incomeTaxRegistration } from "../models/incometax-registration.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const itrRegistration = async (req, res) => {

  // Destructure the body to match model fields exactly
  const {
    userType, // corrected from 'select' to match the model
    fullName,
    fatherName,
    aadharNumber, // corrected from 'aadharCardNumber' to match the model
    gender,
    dateOfBirth, // corrected from 'dob' to match the model
    phoneNumber,
    stateUT, // corrected from 'state' to match the model
    city,
    villageTownTehsilSubDivision, // corrected from 'village' to match the model
    pinCode,
    bankAccountNumber,
    bankName,
    ifscNumber, // corrected from 'ifsc' to match the model
    email,
    panNumber,
    termsAndConditions,
  } = req.body;

  try {
    // Basic field validation
    const fields = [
      userType,
      fullName,
      fatherName,
      aadharNumber,
      gender,
      dateOfBirth,
      phoneNumber,
      stateUT,
      city,
      villageTownTehsilSubDivision,
      pinCode,
      bankAccountNumber,
      bankName,
      ifscNumber,
      email,
      panNumber,
      termsAndConditions,
    ];

    const panCardPath = req.files?.panCard?.[0]?.path;
    const aadharCardPath = req.files?.aadharCard?.[0]?.path;
    const bankPassbookPath = req.files?.bankPassbook?.[0]?.path;

    if (!panCardPath || !aadharCardPath || !bankPassbookPath) {
      return res.status(400).json({ message: "All files are required." });
    }

    const [aadharCardUrl, bankPassbookUrl, panCardUrl] = await Promise.all([
      uploadOnCloudinary(aadharCardPath),
      uploadOnCloudinary(bankPassbookPath),
      uploadOnCloudinary(panCardPath),
    ]).then((results) => results.map((result) => result.url));

    const registrationEntry = await incomeTaxRegistration.create({
      userType,
      fullName,
      fatherName,
      aadharNumber,
      gender,
      dateOfBirth,
      phoneNumber,
      stateUT,
      city,
      villageTownTehsilSubDivision,
      pinCode,
      bankAccountNumber,
      bankName,
      ifscNumber,
      email,
      panNumber,
      termsAndConditions,
      panCardUpload: panCardUrl || " n ",
      aadharCardUpload: aadharCardUrl || " n ",
      bankPassbookUpload: bankPassbookUrl || " n ",
    });

    return res.status(201).json(registrationEntry);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong: " + error.message });
  }
};

export { itrRegistration };
