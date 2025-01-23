const mongoose=require ("mongoose");
// const Schema=mongoose.Schema;
const listingSchema= new mongoose.Schema({
    title:{
        type: String,
        require:true
    },
 
    description:String,
    price:Number,
    image:String,
    location:String,
    country:String,
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;