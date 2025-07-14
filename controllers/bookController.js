// controllers/bookController.js
const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, coverImage, availability } = req.body;
    
    // Validate required fields
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const newBook = await Book.create({
      title,
      author,
      coverImage: coverImage || "",
      availability: availability !== undefined ? availability : true
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
};
