const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    Name:String,
    ImageUrl:String,
    Cost:Number,
    UserEmail:String,
    UserName:String,
    College:String
});

module.exports=mongoose.model("Product",productSchema);