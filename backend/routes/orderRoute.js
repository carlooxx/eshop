import express from "express";
import mongoose from "mongoose";
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
//Getting all ORDERS for user profile
router.get(
  "/myorders",
  verify,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
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

//Adding pay to true (paypal API)
router.put(
  "/:id/pay",
  verify,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true),
        (order.paidAt = Date.now()),
        (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        });
      const updatedOrder = await order.save();
      res.send(updatedOrder);
    } else {
      return res.status(400).send({ message: "There is no order" });
    }
  })
);

export default router;
