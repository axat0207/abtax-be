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
      isPaid : false,
      panCardUpload: panCardUrl || " n ",
      aadharCardUpload: aadharCardUrl || " n ",
      bankPassbookUpload: bankPassbookUrl || " n ",
    });

    return res.status(201).json(registrationEntry);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message });
  }
};


const getItrRegistrationData = async (req, res) => {
  try {
      const ItrRecords = await incomeTaxRegistration.find({ isPaid: true }); // Retrieve all records where isPaid is false

      if (ItrRecords.length === 0) {
          return res.status(404).json({ message: "No unpaid ITR records found." });
      }

      return res.status(200).json(ItrRecords);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};


export { itrRegistration, getItrRegistrationData };
