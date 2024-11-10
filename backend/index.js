import express from "express";
import "./connection.js";
import cors from "cors";
// Routers
import usersRouter from "./routers/user.js";
import productsRouter from "./routers/product.js";
import pendingOrdersRouter from "./routers/pending_order.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/pendingOrder", pendingOrdersRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
