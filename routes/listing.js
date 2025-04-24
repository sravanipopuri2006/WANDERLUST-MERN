const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const listings=require("../models/listings.js")
const wrapasync = require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const passport=require("passport");
const {loggedIn,isOwner,validateSchema}=require("../middleware.js");
const listingsController= require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage})



router.route("/")
.get(wrapasync(listingsController.showListings))
// .post(upload.single('listings[image]'),wrapasync(async(req,res)=>{
    
//     res.send(req.file);

// }))


.post(upload.single('listings[image]'),wrapasync(listingsController.createListing));
router.get("/new",loggedIn,listingsController.getNewForm);

router.route("/:id")
.get(wrapasync(listingsController.showInDetail))
.put(loggedIn,isOwner,upload.single('listing[image]'),wrapasync(listingsController.getEditForm))
.delete(isOwner,loggedIn,wrapasync(listingsController.destroyListings));





router.get("/:id/edit",isOwner,validateSchema,loggedIn,wrapasync(async(req,res)=>{
    let {id}=req.params;
    let listing=await listings.findById(id);
    let originalUrl=listing.image.url;
    originalUrl=originalUrl.replace("/upload","upload/h_300,w_250");

    res.render("listings/editForm.ejs" ,{listing,originalUrl});
}));


module.exports=router;