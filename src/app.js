import * as dotenv from "dotenv";

import categoryRoutes from "./routes/category.route.js";
import connectDb from "./configs/connect-db.config.js";
import express from "express";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// Connect Db
connectDb();
// Connect Db

app.use("/api/v1", categoryRoutes);
app.use("/api/v1", productRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
