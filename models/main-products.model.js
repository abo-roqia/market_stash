import mongoose from "mongoose";

const schema = new mongoose.Schema({
	type: { type: String, required: true, unique: true, trim: true, lowercase: true },
	branches: { type: Object, default: { default: [] } },
});

export default mongoose.model("main-products", schema);
