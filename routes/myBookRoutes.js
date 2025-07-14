// routes/myBookRoutes.js
const express = require("express");
const {
  getMyBooks,
  addToMyBooks,
  updateStatus,
  updateRating
} = require("../controllers/myBookController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getMyBooks);
router.post("/:bookId", authMiddleware, addToMyBooks);
router.patch("/:bookId/status", authMiddleware, updateStatus);
router.patch("/:bookId/rating", authMiddleware, updateRating);

module.exports = router;
