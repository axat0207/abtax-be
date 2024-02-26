import { Router } from "express";
import { gstFilling, getGstData } from "../controllers/gst-filling.js";
import { upload } from "../middleware/multer.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
const router = Router();

router.route("/gst-filling").post(
  verifyJwt,
  upload.fields([
    { name: "saleBill", maxCount: 1 },
    { name: "otherBill", maxCount: 1 },
    { name: "purchaseBill", maxCount: 1 },
  ]),
  gstFilling
);
router.route("/gst-records").get(
  getGstData
);

export default router;
