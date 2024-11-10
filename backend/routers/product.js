import express from "express";
import productSchema from "../models/product.js";
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await productSchema.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const products = [
  { name: "Apple", price: 1.0 },
  { name: "Banana", price: 0.5 },
  { name: "Orange", price: 0.8 },
  { name: "Milk", price: 2.5 },
  { name: "Bread", price: 1.2 },
  { name: "Chicken Breast", price: 5.0 },
  { name: "Rice", price: 1.75 },
  { name: "Pasta", price: 1.0 },
  { name: "Eggs", price: 2.0 },
  { name: "Cheese", price: 3.0 },
  { name: "Tomato", price: 0.9 },
  { name: "Lettuce", price: 1.5 },
  { name: "Carrot", price: 0.7 },
  { name: "Potato", price: 0.4 },
  { name: "Onion", price: 0.6 },
  { name: "Garlic", price: 0.3 },
  { name: "Broccoli", price: 1.8 },
  { name: "Spinach", price: 1.2 },
  { name: "Zucchini", price: 0.85 },
  { name: "Cucumber", price: 0.75 },
  { name: "Bell Pepper", price: 1.25 },
  { name: "Strawberries", price: 3.5 },
  { name: "Blueberries", price: 4.0 },
  { name: "Grapes", price: 2.5 },
  { name: "Watermelon", price: 3.0 },
  { name: "Pineapple", price: 3.5 },
  { name: "Peach", price: 1.5 },
  { name: "Plum", price: 1.0 },
  { name: "Kiwi", price: 0.9 },
  { name: "Lemon", price: 0.5 },
  { name: "Lime", price: 0.4 },
  { name: "Coconut", price: 2.0 },
  { name: "Peanut Butter", price: 3.0 },
  { name: "Jam", price: 2.5 },
  { name: "Honey", price: 5.0 },
  { name: "Olive Oil", price: 4.0 },
  { name: "Vegetable Oil", price: 3.5 },
  { name: "Salt", price: 0.3 },
  { name: "Black Pepper", price: 1.0 },
  { name: "Cinnamon", price: 1.2 },
  { name: "Sugar", price: 0.8 },
  { name: "Flour", price: 1.5 },
  { name: "Baking Soda", price: 0.9 },
  { name: "Yeast", price: 1.0 },
  { name: "Vanilla Extract", price: 3.0 },
  { name: "Chocolate Chips", price: 2.5 },
  { name: "Almonds", price: 5.0 },
  { name: "Walnuts", price: 6.0 },
  { name: "Cashews", price: 5.5 },
  { name: "Chia Seeds", price: 4.0 },
  { name: "Oats", price: 1.2 },
  { name: "Granola", price: 3.5 },
  { name: "Pancake Mix", price: 2.0 },
  { name: "Maple Syrup", price: 4.5 },
  { name: "Ice Cream", price: 3.0 },
  { name: "Yogurt", price: 1.5 },
  { name: "Butter", price: 2.5 },
  { name: "Margarine", price: 2.0 },
  { name: "Cream Cheese", price: 3.0 },
  { name: "Sour Cream", price: 2.0 },
  { name: "Tofu", price: 2.5 },
  { name: "Soy Sauce", price: 2.0 },
  { name: "Hot Sauce", price: 1.5 },
  { name: "Ketchup", price: 2.0 },
  { name: "Mustard", price: 1.0 },
  { name: "Mayonnaise", price: 2.5 },
  { name: "Pickles", price: 1.5 },
  { name: "Relish", price: 1.2 },
  { name: "BBQ Sauce", price: 2.5 },
  { name: "Salad Dressing", price: 2.0 },
  { name: "Potato Chips", price: 1.5 },
  { name: "Popcorn", price: 2.0 },
  { name: "Snack Bars", price: 3.0 },
  { name: "Trail Mix", price: 4.0 },
  { name: "Dried Fruit", price: 3.5 },
  { name: "Granola Bars", price: 2.5 },
  { name: "Gummy Bears", price: 1.5 },
  { name: "Chocolate Bar", price: 1.0 },
  { name: "Cookies", price: 2.0 },
  { name: "Brownies", price: 2.5 },
  { name: "Cakes", price: 3.0 },
  { name: "Pies", price: 4.0 },
  { name: "Cupcakes", price: 2.5 },
  { name: "Candy", price: 1.0 },
  { name: "Soda", price: 1.5 },
  { name: "Juice", price: 2.0 },
  { name: "Water", price: 0.5 },
  { name: "Coffee", price: 2.5 },
  { name: "Tea", price: 1.5 },
  { name: "Energy Drink", price: 2.5 },
  { name: "Beer", price: 3.0 },
  { name: "Wine", price: 10.0 },
  { name: "Spirits", price: 20.0 },
  { name: "Whiskey", price: 30.0 },
];

router.post("/products", async (req, res) => {
  try {
    const count = await productSchema.countDocuments();
    if (count === 0) {
      await productSchema.insertMany(products);
      return res
        .status(201)
        .json({ message: "Products inserted successfully." });
    } else {
      return res
        .status(400)
        .json({ message: "Products already exist in the database." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
