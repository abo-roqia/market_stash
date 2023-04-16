// Node.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";

// Routes
import mainCatagories from "./routes/main-catagories.routes.js";
import mainProducts from "./routes/main-products.routes.js";
import subCatagories from "./routes/sub-catagories.routes.js";
import subProducts from "./routes/sub-products.routes.js";
import test from "./routes/test.js";

let app = express();
dotenv.config();
app.use(cors());
app.use(
	compression({
		level: 9,
		threshold: 100 * 1000,
		filter: (req, res) => (req.header["x-no-compression"] ? false : compression.filter(req, res)),
	})
);

app.use(bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit: 9 * 1000 * 1000 * 1000 * 1000 }));
app.use(bodyParser.json({ extended: true, limit: "500mb", parameterLimit: 9 * 1000 * 1000 * 1000 * 1000 }));

app.use("/api/main/catagories", mainCatagories);
app.use("/api/main/products", mainProducts);

app.use("/api/sub/catagories", subCatagories);
app.use("/api/sub/products", subProducts);
app.use("/api/test", test);

app.use("/", (req, res) => res.send(`Enjoy, Server Is Running.`));

const PORT = process.env.PORT || 3000;
const DBconnection = async () => {
	try {
		const URL = process.env.MARKET_DB;
		await mongoose.connect(URL);
	} catch (error) {
		console.log(`Database disconnected 🤦‍♂️ \n ${error}`);
	}
};

mongoose.set("strictQuery", true);
mongoose.connection.on("connected", () => console.log(`SERVER IS CONNECTED ON [http://localhost:${PORT}]`));
mongoose.connection.on("disconnected", () => console.log("SERVER IS DISCONNECTED."));

app.listen(PORT, DBconnection);
