import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { verify } from "../verifyToken.js";

const router = express.Router();

//Create order
router.post(
  "/",
  verify,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user.id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

//Get ORDER BY id
router.get(
  "/:id",
  verify,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.send(order);
    } else {
      return res.status(400).send({ message: "There is no order" });
    }
  })
);
export default router;
