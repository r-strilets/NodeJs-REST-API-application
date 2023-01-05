const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/user/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.get("/user/verify/:verificationToken", ctrl.verify);

router.post(
  "/user/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrl.resendVerifyEmail
);

router.post("/user/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/user/current", authenticate, ctrl.getCurrent);

router.get("/user/logout", authenticate, ctrl.logout);

router.patch(
  "/user/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.editAvatar
);

module.exports = router;
