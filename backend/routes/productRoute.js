import express from "express";
import Product from "../models/porductModel.js";
import asyncHandler from "express-async-handler";
import { verify } from "../verifyToken.js";
import User from "../models/userModel.js";
const router = express.Router();

//Get all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    //product per page
    const pageSize = 5;
    //curent page or page br 1
    const page = Number(req.query.pageNumber || 1);
    //match with keyword
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    //total count of products
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
//Top rated product carousel
router.get(
  "/top",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

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
//Adding comment at product
router.post(
  "/:id/reviews",
  verify,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    req.user = await User.findById(req.user.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).send({ msg: "Product already reviewed" });
      }

      const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ message: "Review added" });
    } else {
      res.status(400).send({ message: "Product not found" });
    }
  })
);

export default router;
