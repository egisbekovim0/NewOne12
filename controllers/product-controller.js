import Product from "../models/Product.js";

export const getAllProducts = async(req, res, next) =>{
    let products
    try {
        products = await Product.find()
    }catch(err){
        return console.log(err)
    }
    if (!products) {
        return res.status(404).json({message:"No products found"})
    }
    return res.status(200).json({products})
}

export const addProduct = async (req,res,next)=>{
    const {name, description, price, stock, productCategory} =req.body
    const product = new Product({
        name,
        description,
        price,
        stock,
        productCategory
    })
    try{
        await product.save()
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({product})
}

export const updateProduct = async (req, res, next) =>{
    const {name, description, price, stock, productCategory} = req.body
    const productId = req.params.id
    let product

    try {
        product = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            stock,
            productCategory
        })
    }catch(err){
        return console.log(err)
    }
    if(!product){
        return res.status(500).json({message: "couldn't update product"})
    }
    return res.status(200).json({product})
}

export const getById = async (req,res,next)=>{
    const id = req.params.id
    let product
    try {
        product = await Product.findById(id)
    }catch(err){
        return console.log(err)
    }
    if (!product){
        return res.status(404).json({message:"product not found"})
    } 
    return res.status(200).json({product})
}

export const deleteProduct = async (req,res,next) =>{
    const id = req.params.id
    let product 
    try {
        product = await Product.findByIdAndDelete(id)
    }catch(err){
        return console.log(err)
    }
    if (!product){
        return res.status(500).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"succesfully deleted"})
}
