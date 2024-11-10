import express from "express";
import mongoose from "mongoose";

import pendingOrderSchema from "../models/pending_order.js";
const router = express.Router();

router.post("/order", async (req, res) => {
  const { userId, products } = req.body;
  let arr = Array.isArray(products) ? products : JSON.parse(products);

  try {
    const productObjectIds = arr.map(
      (productId) => new mongoose.Types.ObjectId(productId)
    );

    const newOrder = new pendingOrderSchema({
      userId: new mongoose.Types.ObjectId(userId),
      productId: productObjectIds,
    });

    await newOrder.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
function adminCheck(req, res, next) {
  if (req.query.admin === "true") {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Access denied. Admin privileges required." });
  }
}
router.get("/all", adminCheck, async (req, res) => {
  try {
    const orders = await pendingOrderSchema
      .find()
      .populate("userId", "name")
      .populate("productId", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
