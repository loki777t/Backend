const API_BASE = "http://localhost:3000/api/books";

// Add Book
document.getElementById("addBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    });

    if (response.ok) {
      const newBook = await response.json();
      alert(`Book added: ${newBook.title} by ${newBook.author}`);
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      loadBooks(); // Refresh the list
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
});

// Load All Books
document.getElementById("loadBooks").addEventListener("click", loadBooks);

async function loadBooks() {
  try {
    const response = await fetch(API_BASE);
    if (response.ok) {
      const books = await response.json();
      const booksList = document.getElementById("booksList");
      booksList.innerHTML = "";
      books.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = `${book.id}: ${book.title} by ${book.author}`;
        booksList.appendChild(li);
      });
    } else {
      alert("Error loading books");
    }
  } catch (error) {
    console.error("Error loading books:", error);
  }
}

// Get Book by ID
document.getElementById("getBook").addEventListener("click", async () => {
  const id = document.getElementById("getId").value;
  if (!id) return;

  try {
    const response = await fetch(`${API_BASE}/${id}`);
    if (response.ok) {
      const book = await response.json();
      document.getElementById("bookDetails").innerHTML = `
        <strong>ID:</strong> ${book.id}<br>
        <strong>Title:</strong> ${book.title}<br>
        <strong>Author:</strong> ${book.author}
      `;
    } else {
      document.getElementById("bookDetails").innerHTML = "Book not found";
    }
  } catch (error) {
    console.error("Error getting book:", error);
  }
});

// Delete Book by ID
document.getElementById("deleteBook").addEventListener("click", async () => {
  const id = document.getElementById("deleteId").value;
  if (!id) return;

  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.getElementById("deleteMessage").innerHTML =
        "Book deleted successfully";
      loadBooks(); // Refresh the list
    } else {
      document.getElementById("deleteMessage").innerHTML = "Book not found";
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
});
