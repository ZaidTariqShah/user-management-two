const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//routes

//CRUD operations
//View/Read
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//Post
router.post("/users", async (req, res) => {
  try {
    const { name, age, weight } = req.body;
    const newUser = new User({ name, age, weight });
    await newUser.save();
    res.status(200).json({ success: true, user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//Update

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, weight } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, weight },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" }); // ADD return
    }
    //but if the user was updated successfully
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//Delete

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" }); // ADD return
    }
    //if user found and deleted successfully
    res.status(200).json({
      success: true,
      user: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
