const express = require("express");
const router = express.Router();
const passport = require("passport");
const { userControllers } = require("../controllers");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  userControllers.redirectHome
);

router.get("/logout", userControllers.logout);

module.exports = router;
