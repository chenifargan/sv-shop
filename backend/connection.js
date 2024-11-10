import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const URL = process.env.URL;
mongoose
  .connect(URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
