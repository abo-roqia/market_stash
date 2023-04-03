import mongoose from "mongoose";
import Product from "../models/products.model.js";

export const GET_PRODUCTS = async (req, res) => {
	try {
		let productsDetails = await Product.find().sort("type");
		res.status(200).json(productsDetails);
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

export const ADD_PRODUCT = async (req, res) => {
	try {
		let { type } = req.body;

		let newProduct = new Product({ type });
		let saved = await newProduct.save();
		res.status(200).json(saved);
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

export const UPDATE_PRODUCT = async (req, res) => {
	try {
		let id = req.params.id;
		let { branches } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({ error: "ID Is Not Valid." });

		let updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body, branches }, { new: true });
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

export const DELETE_PRODUCT = async (req, res) => {
	try {
		let id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({ error: "ID Is Not Valid." });

		await Product.findByIdAndDelete(id);
		res.status(200).json({ DELETE_PRODUCT: "The Product Details Was Deleted" });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
