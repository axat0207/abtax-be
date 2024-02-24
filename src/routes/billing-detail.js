import { Router } from "express";
import { billingDetails, getBillingDetails } from "../controllers/billing-detail.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
const router = Router();

router.route("/checkout").post(
  verifyJwt,
  billingDetails
);

router.route("/billing-details").get(
  verifyJwt,
  getBillingDetails
);

export default router;
