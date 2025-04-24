const mongoose=require("mongoose");
const { findOneAndDelete } = require("./reviews");
const reviews = require("./reviews.js");
const Schema=mongoose.Schema;
const User=require("./user.js");

const schema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image: {
        url:String,
        filename:String,
        
      },
    price:{
        type:Number
    },
    location:{
        type:String,
        require:true
    }
    ,
    country:{
        type:String,
        require:true
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"reviews"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }


})
schema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await reviews.deleteMany({_id :{$in:listing.reviews}});

    }
    
})
const listings=mongoose.model("listings",schema)
module.exports=listings;