const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const requireAuth = require("../middleware/authMiddleware");

// All wishlist routes require authentication
router.use(requireAuth);

router.get("/", wishlistController.getWishlist);
router.post("/", wishlistController.addToWishlist);
router.delete("/:id", wishlistController.removeFromWishlist);
router.get("/check-stock", wishlistController.checkStock);

module.exports = router;
