const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewares/index");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", authenticate, ctrl.deleteById);

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
