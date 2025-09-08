import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { createBookSchema, idParamSchema } from "../validation/bookValidation";

const router = Router();
const bookController = new BookController();

// Middleware for validating request body
const validateBody = (schema: any) => (req: any, res: any, next: any) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Middleware for validating params
const validateParams = (schema: any) => (req: any, res: any, next: any) => {
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

router.get("/api/books", bookController.getAllBooks.bind(bookController));

router.get(
  "/api/books/:id",
  validateParams(idParamSchema),
  bookController.getBookById.bind(bookController),
);

router.post(
  "/api/books",
  validateBody(createBookSchema),
  bookController.createBook.bind(bookController),
);

router.delete(
  "/api/books/:id",
  validateParams(idParamSchema),
  bookController.deleteBook.bind(bookController),
);

export default router;
