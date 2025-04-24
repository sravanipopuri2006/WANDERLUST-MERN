const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync = require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const reviews=require("../models/reviews.js");

const listings=require("../models/listings.js");
const { loggedIn, isValidReview, saveRedirectUrl,validateReview } = require("../middleware.js");
const reviewController=require("../controllers/review.js");

router.post("/",loggedIn,validateReview,wrapasync(reviewController.createReview));
router.delete("/:reviewId",loggedIn,isValidReview,wrapasync(reviewController.destroyReview));
module.exports=router;