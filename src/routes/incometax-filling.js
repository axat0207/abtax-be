import { Router } from "express";
import { itrFilling,getItrData } from "../controllers/incometax-filling.js";
import { upload } from "../middleware/multer.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
const router = Router();

router.route("/itr-filling").post(
  verifyJwt,
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "bankAccount", maxCount: 1 },
    { name: "form16Gov", maxCount: 1 },
  ]),
  itrFilling
);


router.route("/itr-records").get(
  getItrData
);

export default router;
