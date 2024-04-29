import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 8000;

const router = express.Router();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("Success");
  })
  .catch((error) => {
    console.log(error);
  });

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});
const Product = mongoose.model("Product", schema);

router.get("/products", async (req, res) => {
  try {
    const body = req.body;
    const product = Product.Find(body);

    if (!product) {
      return res.json({ message: "Error" });
    }
    return res.json({
      message: "yay",
      data: product,
    });
  } catch (error) {
    console.log("🚀 ~ router.get ~ error:", error);
  }
});

app.use("/api", router);

app.listen(port, () => {
  console.log(port);
});
