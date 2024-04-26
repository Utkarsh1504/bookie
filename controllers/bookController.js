import * as z from "zod";
import Book from "../models/book.js";

const validateBook = (obj) => {
  const schema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    price: z.number().min(1),
    year: z.number().min(1),
  });
  const response = schema.safeParse(obj);
  return response;
};
export const createBook = async (req, res) => {
  try {
    const validate = validateBook(req.body);
    if (!validate.success) {
      res.status(400).json({ message: "invalid input", err: validate.error });
      return;
    }
    const { title, author, price, year } = req.body;
    const newBook = new Book({ title, author, price, year });
    await newBook.save();
    res.status(201).json({ message: "book created", newBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "books fetched", books });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json({ message: "book fetched", book });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

export const getBooksByYear = async (req, res) => {
  try {
    const validateParams = z.number();
    const response = validateParams.safeParse(parseInt(req.params.year));
    if (!response.success) {
      res.status(400).json({ message: "invalid year", err: response.error });
      return;
    }
    const year = parseInt(req.params.year);
    const books = await Book.find({ year });
    res.status(200).json({ message: "books fetched", books });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
export const getBooksByAuthor = async (req, res) => {
  try {
    const validateParams = z.string();
    const response = validateParams.safeParse(req.params.author);
    if (!response.success) {
      res.status(400).json({ message: "invalid author", err: response.error });
      return;
    }
    const author = req.params.author;
    const books = await Book.find({ author });
    res.status(200).json({ message: "books fetched", books });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const schema = z.object({
      title: z.string().min(1).optional(),
      author: z.string().min(1).optional(),
      price: z.number().min(1).optional(),
      year: z.number().min(1).optional(),
    });

    const filteredRequestBody = Object.fromEntries(
      Object.entries(req.body).filter(([_, v]) => v !== undefined && v !== null)
    );

    const validate = schema.safeParse(filteredRequestBody);
    if (!validate.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: validate.error });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      { _id: id },
      filteredRequestBody,
      {
        new: true,
      }
    );

    res.status(200).json({ message: "book updated", updatedBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "book deleted", book });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
