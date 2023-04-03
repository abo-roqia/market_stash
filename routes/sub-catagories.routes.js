import express from "express";
import { GET_CATAGORIES, ADD_CATAGORY, UPDATE_CATAGORY, DELETE_CATAGORY } from "../controllers/sub-catagories.controllers.js";

const router = express.Router();

router.get("/", GET_CATAGORIES);

router.post("/", ADD_CATAGORY);

router.put("/:id", UPDATE_CATAGORY);

router.delete("/:id", DELETE_CATAGORY);

export default router;
