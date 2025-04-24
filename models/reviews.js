

const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const reviewSchema=new Schema({
    comments:{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",

    },

})
const reviews=mongoose.model("reviews",reviewSchema);
module.exports=reviews;