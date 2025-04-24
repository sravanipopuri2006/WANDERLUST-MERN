const reviews=require("../models/reviews");
const listings=require("../models/listings");
module.exports.createReview=async(req,res)=>{
    console.log(req.body.reviews);
    
    let newListing= await listings.findById(req.params.id);
    

    let newReview=new reviews(req.body.reviews);
    newReview.author=res.locals.curr._id;
    newListing.reviews.push(newReview);
    
    await newReview.save();
    await newListing.save();
    req.flash("success","New Review is succesfully created!")
    res.redirect(`/listings/${req.params.id}`);
    

};
module.exports.destroyReview=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    await reviews.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});

    await reviews.findByIdAndDelete(reviewId);
    req.flash("error","Review is successfully deleted!");
 
    res.redirect(`/listings/${id}`)

};