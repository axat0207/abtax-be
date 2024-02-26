import { gstRegistration } from "../models/gst-registration.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const gstRegistrationController = async (req, res) => {
  const {
    userType,
    panOrAadharName,
    gender,
    panNumber,
    aadharNumber,
    email,
    mobileNumber,
    businessPurpose,
    fatherName,
    dateOfBirth,
    indianState,
    districtCity,
    subDivisionTehsil,
    pinCode,
    wardNumberVillage,
    stateUT,
  } = req.body;
  try {
    const aadharCardPath = req.files.aadharCard[0].path;
    const panCardPath = req.files.panCard[0].path;
    const passportPhotoPath = req.files.passportPhoto[0].path;
    const bankDetailsPath = req.files.bankDetails[0].path;
    const gumastaMsmeKhasraElectricityBillPath =
      req.files.gumastaMsmeKhasraElectricityBill[0].path;
    const ownershipDocumentShopPath = req.files.ownershipDocumentShop[0].path;
    const electricityBillPath = req.files.electricityBill[0].path;

    if (
      !aadharCardPath ||
      !panCardPath ||
      !passportPhotoPath ||
      !bankDetailsPath ||
      !gumastaMsmeKhasraElectricityBillPath ||
      !ownershipDocumentShopPath ||
      !electricityBillPath
    ) {
      return res.status(400).json({ message: "All files are required." });
    }

    // Uploads
    const aadharCard = await uploadOnCloudinary(aadharCardPath);
    const panCard = await uploadOnCloudinary(panCardPath);
    const passportPhoto = await uploadOnCloudinary(passportPhotoPath);
    const bankDetails = await uploadOnCloudinary(bankDetailsPath);
    const gumastaMsmeKhasraElectricityBill = await uploadOnCloudinary(
      gumastaMsmeKhasraElectricityBillPath
    );
    const ownershipDocumentShop = await uploadOnCloudinary(
      ownershipDocumentShopPath
    );
    const electricityBill = await uploadOnCloudinary(electricityBillPath);

    const registrationEntry = await gstRegistration.create({
      userType,
      panOrAadharName,
      gender,
      panNumber,
      aadharNumber,
      email,
      mobileNumber,
      businessPurpose,
      fatherName,
      dateOfBirth,
      indianState,
      districtCity,
      subDivisionTehsil,
      pinCode,
      wardNumberVillage,
      stateUT,
      isPaid : false,
      aadharCard: aadharCard.url || "not found",
      panCard: panCard.url || "not found",
      passportPhoto: passportPhoto.url || "not found",
      bankDetails: bankDetails.url || "not found",
      gumastaMsmeKhasraElectricityBill:
        gumastaMsmeKhasraElectricityBill.url || "not found",
      ownershipDocumentShop: ownershipDocumentShop.url || "not found",
      electricityBill: electricityBill.url || "not found",
    });

    return res.status(201).json(registrationEntry);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message });
  }
};

const getGstRegistrationData = async (req, res) => {
  try {
      const ItrRecords = await gstRegistration.find({ isPaid: false }); // Retrieve all records where isPaid is false

      if (ItrRecords.length === 0) {
          return res.status(404).json({ message: "No unpaid ITR records found." });
      }

      return res.status(200).json(ItrRecords);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

export { gstRegistrationController, getGstRegistrationData };
