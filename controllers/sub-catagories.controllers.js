import mongoose from "mongoose";
import Catagories from "../models/sub-catagories.model.js";

export const GET_CATAGORIES = async (req, res) => {
	try {
		let catagories = await Catagories.find().sort("type");
		res.status(200).json(catagories);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

export const ADD_CATAGORY = async (req, res) => {
	try {
		let { type, branches, img } = req.body;
		let newCat = new Catagories({ type, branches, img });
		let saved = await newCat.save();
		res.status(200).json(saved);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

export const UPDATE_CATAGORY = async (req, res) => {
	try {
		let { id } = req.params;
		let body = req.body;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({ error: "401 -> لحد حدث خطأ اثناء اضافه العنصر" });

		let updatedCatagory = await Catagories.findByIdAndUpdate(id, body, { new: true });
		res.status(200).json(updatedCatagory);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

export const DELETE_CATAGORY = async (req, res) => {
	try {
		let { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({ error: "401 -> لحد حدث خطأ اثناء اضافه العنصر" });
		await Catagories.findByIdAndDelete(id);
		res.status(200).json({ DELETE_CATAGORY: "Catagory Was Deleted" });
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};
