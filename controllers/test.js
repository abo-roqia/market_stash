import Test from "../models/test.js";

export const GET_ALL = async (req, res) => {
	try {
		let catagories = await Test.find().limit(1);
		res.status(200).json(catagories);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};
