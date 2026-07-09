const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
} = require("../controllers/cartController");

router.get("/", getCart);

router.post("/", addToCart);

router.patch("/:id", updateCart);

router.delete("/:id", removeCartItem);

module.exports = router;
