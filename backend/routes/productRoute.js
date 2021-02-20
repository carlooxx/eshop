import express from "express";
import Product from "../models/porductModel.js";
import asyncHandler from "express-async-handler";
import { verify } from "../verifyToken.js";
const router = express.Router();

//Get all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//Get product by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);
//Delete product by ID
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);
//Get sample product as Admin
router.post(
  "/",
  verify,
  asyncHandler(async (req, res) => {
    const product = new Product({
      user: req.user.id,
      name: "Sample name",
      price: 0,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample Category",
      counInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
    const newProduct = await product.save();
    res.json(newProduct);
  })
);
//Edit sample product as Admin
router.put(
  "/:id",
  verify,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      (product.name = name),
        (product.price = price),
        (product.image = image),
        (product.brand = brand),
        (product.category = category),
        (product.countInStock = countInStock),
        (product.numReviews = numReviews),
        (product.description = description);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      return res.status(400).send({ message: "There is no product" });
    }
  })
);
export default router;
