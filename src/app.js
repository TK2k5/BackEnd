import categoryRoutes from "./routes/category.routes.js";
import connectDb from "./configs/connect-db.config.js";
import express from "express";
import morgan from "morgan";
import productRoutes from "./routes/product.routes.js";

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect Db
connectDb();

// router
app.use("/api", [productRoutes, categoryRoutes]);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
