import { Router } from "express";
import { itrRegistration } from "../controllers/incometax-registration.js";
import { upload } from "../middleware/multer.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
const router = Router();

router.route("/itr-registration").post(
  // verifyJwt,
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "bankPassbook", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
  ]),
  itrRegistration
);

export default router;
