const express = require("express");
const { validateBody, authenticate } = require("../../middleware");
const { schemas } = require("../../schemas");
const { User } = require("../../controllers");
const {upload} = require('../../middleware')
const router = express.Router();


router.post("/register", validateBody(schemas.signUpSchema), User.register);

router.post("/login", validateBody(schemas.loginSchema), User.login);

router.post("/logout", authenticate, User.logout);

router.get("/current", authenticate, User.getCurrent);

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  User.updateSubscription
);
router.patch('/avatars', authenticate, upload.single('avatarURL'), User.updateAvatar)
module.exports = router;
