import express from "express";
import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../controllers/sub-products.controller.js";

const router = express.Router();

router.get("/", GET_PRODUCTS);

router.post("/", ADD_PRODUCT);

router.put("/:id", UPDATE_PRODUCT);

router.delete("/:id", DELETE_PRODUCT);

export default router;
