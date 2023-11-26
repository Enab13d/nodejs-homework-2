const { model, Schema } = require("mongoose");
const joi = require("joi");
const subscriptions = ["starter", "pro", "business"];
const { handleMongooseError } = require("../helpers");
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token required"],
    },
  },
  { timestamps: true, versionKey: false }
);
userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

const signUpSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().min(6).max(32).required(),
  subscription: joi.string().valid(...subscriptions),
});
const loginSchema = joi.object({
  password: joi.string().min(6).max(32).required(),
  email: joi.string().required().email(),
});
const updateSubscriptionSchema = joi.object({
  subscription: joi
    .string()
    .valid(...subscriptions)
    .required(),
});
const updateAvatarSchema = joi.object({
  avatarURL: joi.string().required(),
});

const verificationSchema = joi.object({
  email: joi.string().required().email(),
});

const schemas = {
  signUpSchema,
  loginSchema,
  updateSubscriptionSchema,
  updateAvatarSchema,
  verificationSchema,
};

module.exports = {
  User,
  schemas,
};
