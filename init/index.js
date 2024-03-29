const mongoose = require("mongoose");
 const Listing = require('../models/listing.js');
 const initData = require('./data.js')


    async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  }
  
  main()
   .then((res)=>{
     console.log("connected sucessfully");
   })
   .catch((err)=>{
     console.log(err);
   })
  
   const initDB = async ()=>{
     Listing.deleteMany({});
     Listing.insertMany(initData.data);

}

initDB();