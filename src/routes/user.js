import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  changeCurrentPassword,
  getUser,
  updateUser
} from "../controllers/user.js";
import { upload } from "../middleware/multer.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt, logout);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/get-user").get(verifyJwt, getUser);
router.route("/update-user").post(verifyJwt, updateUser);

export default router;
