import mongoose from "mongoose";

let schema = new mongoose.Schema({
	type: { type: String, required: true, trim: true, unique: true, lowercase: true },
	branches: { type: Array, required: true },
	img: { type: String },
});

export default mongoose.model("test", schema);
