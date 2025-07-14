// controllers/myBookController.js
const MyBook = require("../models/MyBook");

exports.getMyBooks = async (req, res) => {
  const books = await MyBook.find({ userId: req.userId }).populate("bookId");
  res.json(books);
};

exports.addToMyBooks = async (req, res) => {
  const { bookId } = req.params;

  const alreadyAdded = await MyBook.findOne({ userId: req.userId, bookId });
  if (alreadyAdded) return res.status(400).send("Already added");

  const entry = await MyBook.create({ userId: req.userId, bookId });
  res.status(201).json(entry);
};

exports.updateStatus = async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;

  await MyBook.findOneAndUpdate(
    { userId: req.userId, bookId },
    { status }
  );

  res.send("Status updated");
};

exports.updateRating = async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  await MyBook.findOneAndUpdate(
    { userId: req.userId, bookId },
    { rating }
  );

  res.send("Rating updated");
};
