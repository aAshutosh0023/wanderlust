const mongoose = require("mongoose");

let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Not available"
    },
 
    image: {
        filename: {
            type: String,
         
        },
        url: {
            type: String,
            default: "https://ik.imgkit.net/3vlqs5axxjf/MM-TP/ik-seo/https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/2af41f5a-da46-41c5-8016-a449c5f7c8fb/source/Rendering-of-the-Exterior-of-the-Hyatt-Centric-Que.png?tr=w-1400%2Ch-650%2Cfo-auto",

            set: (v)=>(v)=== "" ? "https://ik.imgkit.net/3vlqs5axxjf/MM-TP/ik-seo/https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/2af41f5a-da46-41c5-8016-a449c5f7c8fb/source/Rendering-of-the-Exterior-of-the-Hyatt-Centric-Que.png?tr=w-1400%2Ch-650%2Cfo-auto" : v,

        
    },
},

    price: {
        type: Number,
        required: true,
        min: 1
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
