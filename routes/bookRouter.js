import express from "express";

import {
  createBook,
  getAllBooks,
  getBook,
  getBooksByYear,
  getBooksByAuthor,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import { authMiddleware } from "../middlewares/auth.js";

const bookRouter = express.Router();

bookRouter.use(authMiddleware);

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/filter/year/:year", getBooksByYear);
bookRouter.get("/filter/author/:author", getBooksByAuthor);

export default bookRouter;
