import express from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verify } from "../verifyToken.js";

dotenv.config();
const router = express.Router();

//Register user
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      //Password encrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //Modeling new User
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
        expiresIn: 360000,
      });

      //Saving user
      await user.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      });
    } catch (err) {
      res.status(400);
      //Check if user exist
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist)
        return res.status(400).send({ msg: "User already exist" });
    }
  })
);

//Login user
router.post("/login", async (req, res) => {
  try {
    //User exist check
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ msg: "Invalid Credentials" });

    //Password = Email check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ msg: "Invalid Credentials" });

    // //JWT
    const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
      expiresIn: 360000,
    });
    res.header("auth-token", token);
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Get user profile
router.get(
  "/profile",
  verify,
  asyncHandler(async (req, res) => {
    //Returning user's data beside password
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      res.status(400);
      throw new Error("Server error");
    }
  })
);

//UPDATE user profile
router.put(
  "/profile",
  verify,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          //Password encrypt
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          user.password = hashedPassword;
        }
      }

      const updateUser = await user.save();

      res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        password: updateUser.password,
      });
    } catch (err) {
      res.status(400);
      throw new Error("Server error");
    }
  })
);

//Get all users as ADMIN = true
router.get("/users", verify, async (req, res) => {
  const users = await User.find({});
  const user = await User.findById(req.user.id);
  if (user && user.isAdmin) {
    res.json(users);
  } else {
    return res.status(400).send({ message: "No Admin Authorization" });
  }
});
//Delete a user as ADMIN
router.delete("/users/:id", verify, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.send({ message: "User removed" });
  } else {
    return res.status(500).send({ message: "Server error" });
  }
});

//Get user by Id as ADMIN
router.get("/users/:id", verify, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    return res.send({ message: "User not found" });
  }
});
//UPDATE any user profile as ADMIN
router.put(
  "/users/:id",
  verify,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
export default router;
