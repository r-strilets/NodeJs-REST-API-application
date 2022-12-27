const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/user/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post("/user/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/user/current", authenticate, ctrl.getCurrent);

router.get("/user/logout", authenticate, ctrl.logout);

module.exports = router;
