import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, products});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};

export const addProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'All fields are required' });
    }
    // Save the product
    const newProduct = new Product(product);
    
    try {
        await newProduct.save();
        res.status(201).json({success: true, product: newProduct});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid Product ID'});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        return res.status(200).json({success: true, product: updatedProduct});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error while updating the product"});
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid Product ID'});
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: 'The product is deleted'});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error while deleting the product"});
    }
};