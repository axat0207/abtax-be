import { Router } from "express";
import { addToCart, viewCart, removeFromCart } from "../controllers/addto-cart.js";
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

router.route("/remove-item").delete(
  verifyJwt,
  removeFromCart
);

export default router;
