const listings=require("../models/listings");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const accessToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: accessToken });

module.exports.showListings=async (req,res)=>{
   
    const arr=await listings.find({});
    res.render("listings/AllDisplay.ejs",{arr});
    
    
};
module.exports.getNewForm=(req,res)=>{
    res.render("listings/newListing.ejs");
};
module.exports.showInDetail=async (req,res)=>{
    let {id}=req.params;
    let listing=await listings.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    res.render("listings/indDisplay.ejs",{listing});
    console.log(listing);
    
    
};
module.exports.createListing=async (req,res,next)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listings.location,
        limit: 2
      })
        .send()
    
    console.log(req.user);
    let url=req.file.path;
    let filename=req.file.filename;
    
    
    const newListing=new listings(req.body.listings);
    newListing.image={url,filename};
    
    newListing.owner=req.user._id;
    newListing.geometry=response.body.features[0].geometry;
    let savedListing=await newListing.save();
    console.log(savedListing);
    req.flash("success","New Hotel is succesfully created!");
    res.redirect("/listings")
};
module.exports.getEditForm=async(req,res)=>{
    let {id}=req.params;
  
   
    
    let listing=await listings.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
       
        listing.image={url,filename};
        
        await listing.save();

    }
    req.flash("success","Edited the Hotel Info Scuccesfully!");
    res.redirect(`/listings/${id}`)  
};
module.exports.destroyListings=async(req,res)=>{
    let {id}=req.params;
    await listings.findByIdAndDelete(id);
    req.flash("error","Deleted the Hotel Successfully!")
    res.redirect("/listings")
};