
const express=require("express");
const router=express.Router();
const wrapasync = require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");
router.route("/signup")
.get(wrapasync(userController.getSignupForm))
.post(wrapasync(userController.signup));
router.route("/login")
.get(wrapasync(userController.getLoginForm))
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapasync(userController.login));
router.get("/logout",wrapasync(userController.logout))

module.exports=router;