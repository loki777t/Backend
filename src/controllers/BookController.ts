import { Request, Response } from "express";
import { Book } from "../models/Book";

export class BookController {
  private books: Book[] = [];
  private nextId: number = 1;

  public getAllBooks(req: Request, res: Response): void {
    res.json(this.books);
  }

  public getBookById(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.json(book);
  }

  public createBook(req: Request, res: Response): void {
    const { title, author } = req.body;
    const newBook = new Book(this.nextId++, title, author);
    this.books.push(newBook);
    res.status(201).json(newBook);
  }

  public deleteBook(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    this.books.splice(index, 1);
    res.status(204).send();
  }
}
