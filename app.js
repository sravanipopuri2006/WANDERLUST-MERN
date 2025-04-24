if(process.env.NODE_ENV!="production"){
    require('dotenv').config()

}
const express = require("express")
const app = express();
const mongoose = require("mongoose");
app.set("views engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const engine = require('ejs-mate')
app.engine('ejs', engine)
app.use(express.static(path.join(__dirname, "public")));
const ExpressError = require("./utils/ExpressError.js");
const listing = require("./routes/listing.js");
const review = require("./routes/review.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport=require('passport');
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const user=require("./routes/user.js");
const dbUrl=process.env.DB_URL;








main().then(() => {
    console.log("DB connected")
})
    .catch((err) => {
        console.log("some error occured");
    })
async function main() {
    // mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    mongoose.connect(dbUrl);

}
const store=MongoStore.create({ mongoUrl: dbUrl,
    cryto:{
        secret:process.env.SECRET,
        
    },
    touchAfter:24*60*60,

 });
 store.on("error",()=>{
    console.log("error in database");
 })


const sessionInfo={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,

    }
}
app.use(session(sessionInfo));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(8080, (req, res) => {
    console.log("listening");
})
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curr=req.user;
    next();
})
// app.get("/", (req, res) => {
//     res.send("This is working!");
// })
app.use("/listings", listing);
app.use("/",user);


app.use("/listings/:id/reviews", review);

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));

});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message })
})


