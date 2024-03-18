 let express = require("express")
 let app = express();
 const ejsMate = require('ejs-mate');
 var methodOverride = require('method-override')
 const mongoose = require("mongoose");
 const Listing = require('./models/listing.js');
 const wrapAsync = require('./utils/wrapAsync.js')
 const expressError = require('./utils/expressError.js')
 const path = require("path");

 const {listingSchema} = require('./schema.js');
const { constants } = require("buffer");

 app.use(methodOverride("_method"));

 app.set("view engine","ejs");

 app.engine("ejs",ejsMate)

 app.use(express.urlencoded({extended: true}));
 
 app.set("views",path.join(__dirname,"views")); 

 app.use(express.static(path.join(__dirname,"/public")));

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

  const validateListing = (req,res,next)=>{
    let {error} =listingSchema.validate(req.body)
      
 let errMsg = error.details.map((el)=>el.message).join(",");

          if(error){
            throw new expressError(400,errMsg);
          } 
          else{
            next();
          }
      }

  

    //all listing route
 
  app.get("/listings",wrapAsync(async(req,res)=>{
  
       let allLists = await Listing.find({});

       res.render("./listings/index.ejs",{allLists});

  })  )

  //new listing route
  app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})

 
  app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
        
   
  /*  if(!req.body.listing){
      console.log("error aagyi bro")
      throw new expressError(400,"send valid data for listing!")
     }  //agar kisi ne hopschotch ka use krke empty listing object bheja..means no details. to error dena,yeh custom error hai */
        
            /* let result =  listingSchema.validate(req.body)
               console.log(result);

                 if(result.error){
                   throw new expressError(400,result.error);
                 }  we will pass it as middleware..iska function bna lete hai..fir usko as  middleware bula lenge*/
     
       let newListing = req.body.listing
     
        await Listing.create(newListing);
         res.redirect("/listings"); 

          //    next(err);  no need..already include in the wrapAsync function
         
  })); 
 
//show route
          app.get("/listings/:id",wrapAsync(async(req,res)=>{
          let {id}= req.params;

          const list = await Listing.findById(id);
              res.render("./listings/show.ejs",{list});
            }))

    //edit route
   app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{

    
               let {id} = req.params;
              const list = await Listing.findById(id);
               res.render("./listings/edit.ejs",{list});
   })     )

  
     app.put("/listings/:id",wrapAsync(async (req,res)=>{
          
           if(!req.body.listing){
           throw new expressError(400,"send valid data for update.")
              }
     
              

               let {id} = req.params;
               let updatedList = req.body;   //req.body.listing
              

               await  Listing.findByIdAndUpdate(id,{...updatedList}) ; 
               res.redirect(`/listings/${id}`);
     }))
         
     //delete route
    app.delete("/listings/:id",wrapAsync(async(req,res)=>{
                    let {id}= req.params;
                   await Listing.findByIdAndDelete(id);

                    res.redirect("/listings/");
    }))


  //we use next for it kyuki wrapAsync use ni kiya ,kyuki yeh async nhi hai.
    app.all("*",(req,res,next)=>{
         next(new expressError(404,"page not found!"));
    })

        app.use((err,req,res,next)=>{
          let {statusCode=500, message="something wrong occured!!"} = err;
            //res.status(statusCode).send(message);
           res.status(statusCode).render("error.ejs",{message});
        })

  app.listen(8080,()=>{
      console.log("server start");
  })