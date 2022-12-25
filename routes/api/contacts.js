const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateContactBody } = require("../../middlewares/index");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateContactBody(schemas.addSchema), ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.put("/:id", validateContactBody(schemas.addSchema), ctrl.updateById);

router.patch(
  "/:id/favorite",
  validateContactBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
