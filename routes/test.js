import express from "express";
import { GET_ALL } from "../controllers/test.js";

const router = express.Router();

router.get("/", GET_ALL);

export default router;
