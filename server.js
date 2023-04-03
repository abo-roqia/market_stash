// Node.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// Routes
import catagoriesRouter from "./routes/catagories.routes.js";
import productsRouter from "./routes/products.routes.js";

let app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit: 500000 }));
app.use(bodyParser.json({ extended: true, limit: "500mb", parameterLimit: 500000 }));
app.use(express.json());

app.use("/api/main/catagories", catagoriesRouter);
app.use("/api/main/products", productsRouter);
app.use("/api/sub/catagories", catagoriesRouter);
app.use("/api/sub/products", productsRouter);
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
