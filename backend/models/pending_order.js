import mongoose from "mongoose";
const pendingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});
const pending_order = mongoose.model("pending_orders", pendingSchema);
export default pending_order;
