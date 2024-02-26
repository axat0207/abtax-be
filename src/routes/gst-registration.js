import { Router } from "express";
import { gstRegistrationController, getGstRegistrationData } from "../controllers/gst-registration.js";
import { upload } from "../middleware/multer.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
const router = Router();

router.route("/gst-registration").post(
  verifyJwt,
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "electricityBill", maxCount: 1 },
    { name: "ownershipDocumentShop", maxCount: 1 },
    { name: "gumastaMsmeKhasraElectricityBill", maxCount: 1 },
    { name: "bankDetails", maxCount: 1 },
  ]),
  gstRegistrationController
);

router.route("/gst-registration-records").get(
  getGstRegistrationData
);

export default router;
