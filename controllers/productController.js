const Product=require("../models/Product");
const User=require("../models/User");
exports.addProduct=async(req,res)=>{

    try{

        const email=req.session.email;

        const user=await User.findOne({

            EmailId:email

        });

        if(!user){

            return res.send("Please login first");

        }

        const product=new Product({

            Name:req.body.productName,

            ImageUrl:req.body.image,

            Cost:req.body.cost,

            Description:req.body.description,

            UserEmail:user.EmailId,

            UserName:user.UserName,

            College:user.College,
            Category:req.body.category

        });

        await product.save();

        res.render("productadded",{

            product

        });

    }

    catch(err){

        console.log(err);

        res.send("Unable to add product");

    }

};
exports.displayProducts=async(req,res)=>{

    const email=req.session.email;

    const user=await User.findOne({

        EmailId:email

    });

    if(!user){

        return res.redirect("/");

    }

    res.render("displayproducts",{

        products

    });

};
exports.productDetails=async(req,res)=>{

    const id=req.params.id;

    const product=await Product.findById(id);

    if(!product){

        return res.send("Product not found");

    }

    res.render("productdetails",{

        product

    });

};
exports.deleteProduct=async(req,res)=>{

    const id=req.params.id;

    const product=await Product.findById(id);

    if(!product){

        return res.send("Product not found");

    }

    if(product.UserEmail!==req.session.email){

        return res.send("Unauthorized");

    }

    await Product.findByIdAndDelete(id);

    res.redirect("/products");

};
exports.updateProduct=async(req,res)=>{

    const id=req.params.id;

    const product=await Product.findById(id);

    if(product.UserEmail!==req.session.email){

        return res.send("Unauthorized");

    }

    product.Name=req.body.productName;

    product.Cost=req.body.cost;

    product.ImageUrl=req.body.image;

    product.Description=req.body.description;

    await product.save();

    res.redirect("/products");

};


