const Joi = require('joi');

module.exports.listingSchema = Joi.object({
     
    listing: Joi.object({   //listing is the object here.
    
     title: Joi.string().required(),
     description: Joi.string().required(),
     country: Joi.string().required(),
     location: Joi.string() .required(),
     price: Joi.number().required().min(0),
     image: Joi.string().allow("",null)  //not required...nhi doge pic toh bhi koi naa.
        
    }).required() //listing object is required too...khali hua toh nhi chalegaa..

})
 
