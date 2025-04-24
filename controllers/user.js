const User=require("../models/user.js");
module.exports.getSignupForm=async(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signup=async(req,res)=>{
    
    let {username,email,password}=req.body;
    let user=new User({username,email});
    const registeredUser=await User.register(user,password);
    console.log(registeredUser);

    
    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Welcome, Your account is successfully created!");
        res.redirect("/listings");
       
    })
    
};
module.exports.getLoginForm=async(req,res)=>{
    res.render("users/login.ejs");

};
module.exports.login=async(req,res)=>{
    
    req.flash("success","Welcome back to Wanderlust");
    console.log(res.locals.redirect)
    let redirect=res.locals.redirect||"/listings";
    res.redirect(redirect);

};
module.exports.logout=async(req,res,next)=>{
   
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("error","You Logged out from Wanderlust,Login to Continue!")
        res.redirect("/listings");
    })
};