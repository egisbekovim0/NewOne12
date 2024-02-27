import ProductCategory from "../models/ProductCategory.js";


export const getAllProductCategories = async (req, res, next) => {
    try {
        const productCategories = await ProductCategory.find();
        return res.status(200).json({ productCategories });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const addProductCategory = async (req, res, next) => {
    const { name } = req.body;

    try {
        const productCategory = new ProductCategory({
            name
        });

        await productCategory.save();

        return res.status(200).json({ productCategory });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateProductCategory = async (req, res, next) => {
    const {name} = req.body;
    const productCategoryId = req.params.id;

    try {
        const productCategory = await ExerciseType.findByIdAndUpdate(productCategoryId, {
            name
        });

        return res.status(200).json({ productCategory });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getProductCategoryById = async (req, res, next) => {
    const productCategoryId = req.params.id;

    try {
        const productCategory = await ExerciseType.findById(productCategoryId);
        if (!productCategory) {
            return res.status(404).json({ message: "category not found" });
        }
        return res.status(200).json({ productCategory });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteProductCategory= async (req, res, next) => {
    const productCategoryId = req.params.id;

    try {
        const productCategory = await Order.findByIdAndDelete(productCategoryId);
        if (!productCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

