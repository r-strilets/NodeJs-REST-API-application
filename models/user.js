const { Schema, model } = require("mongoose");
const Joi = require("joi");

const RexExp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: RexExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(RexExp).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(RexExp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userShema);

module.exports = {
  User,
  schemas,
};
