const Joi=require("joi");
const reviews = require("./models/reviews");


module.exports.listingSchema=Joi.object({
    listings:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().allow("",null)


    }).required(),
})

module.exports.reviewSchema=Joi.object({
    reviews:Joi.object({
        comments:Joi.string().required(),
        rating:Joi.number().required(),

    }).required(),

})