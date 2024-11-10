import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const product = mongoose.model("products", productsSchema);
export default product;
