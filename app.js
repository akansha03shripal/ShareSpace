const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

const methodOverride=require("method-override");

engine = require('ejs-mate')
app.engine('ejs', engine);

main().then((req , res)=>{
    console.log("working");
}).catch(err=>{
    console.log(err);
})


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnbb")
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded ({extended:true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("Hi I'm a root");
})
app.get("/listings",async(req,res)=>{
    const allListing=await Listing.find({});
        res.render("index.ejs",{allListing});

})

//new route
app.get("/listing/new",(req,res)=>{
  
    res.render("new.ejs");
})

//show route
app.get("/listing/:id",async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("show.ejs",{listing});


})

//create new route
app.post("/listings", async(req,res)=>{
//    let listings=req.body/listing;
   const newlisting=new Listing(req.body.listing);
   await newlisting.save();
   res.redirect("\listings");

})//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}= req.params;
const listing= await Listing.findById(id);

    res.render("edit.ejs",{listing})
})
//update route
app.put("/listings/:id",async(req,res)=>{
    const {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
//    res.redirect(`/listings/${id}`);

res.redirect("/listings")

})
//DELETE RAUTE
app.delete("/listing/:id/delete",async(req,res)=>{
    const {id}=req.params;
await Listing.findByIdAndDelete(id);
console.log("gpmgpdf");
res.redirect("/listings");
})
app.listen(8080,()=>{
    console.log("app is  listening port");

})


// app.get("/testListing",async(req,res)=>{
//     const sampleList=new Listing({
//         tittle:"V Villa",
//         description:" My new Home",
//         price:1200,
//         location:"Jabalpur",
//         country:"India"
//     })
//     await sampleList.save();
//     console.log("working");
//     res.send("Your data is saved");
// })
