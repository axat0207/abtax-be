import { Router } from "express";
import { addToCart, viewCart } from "../controllers/addto-cart.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
const router = Router();

router.route("/add-to-cart").post(
  verifyJwt,
  addToCart
);

router.route("/view-cart").get(
  verifyJwt,
  viewCart
);

export default router;
