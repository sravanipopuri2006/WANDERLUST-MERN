const listings=require("./models/listings");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const reviews = require("./models/reviews.js");

module.exports.loggedIn=(req,res,next)=>{

    console.log(req.user);
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to make changes!")
        return res.redirect("/login");

    }
    else{
        next();

    }
   
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirect=req.session.redirectUrl;

    }
    next();
   

}
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await listings.findById(id);
    if(!listing.owner._id.equals(res.locals.curr._id)){
        req.flash("error","You dont have access to makes changes!")
        return res.redirect(`/listings/${id}`);
        
    }
    next();
}
module.exports.validateSchema=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};
module.exports.isValidReview=async (req,res,next)=>{

    let {id,reviewId}=req.params;
    let review=await reviews.findById(reviewId);
    if(!review.author.equals(res.locals.curr._id)){
        req.flash("error","You dont have access to makes changes in review!")
        return  res.redirect(`/listings/${id}`);
        
    }
    next();
}
module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }

};
