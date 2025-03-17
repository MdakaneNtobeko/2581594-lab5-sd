const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;
const studentNumber = "2581594";

const books = [
    {
        "id": "1",
        "title": "To Kill a Mockingbird",
        "details": [
          {
            "id": "1",
            "author": "Harper Lee",
            "genre": "Fiction",
            "publicationYear": 1960
          }
        ]
      }
      
];



app.get("/whoami", (req, res) => {
    res.send(`"studentNumber": "${studentNumber}"`);
});

app.get("/books", (req, res) => {
    res.send(books);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(c => c.id === req.params.id);

    if (!book){
        res.status(404).send("A book with that Id does not exist");
        return;
    }
    res.send(book);
});

app.post("/books", (req, res) => {
    const book = {
        id: req.body.id,
        title: req.body.title,
        details: req.body.details
    };
    books.push(book);
    res.send(book);
});

app.put("/books/:id", (req, res) => {
    const book = books.find(c => c.id === req.params.id);

    book.id = req.body.id;
    book.title = req.body.title,
    book.details = req.body.details

    res.send(book);
});

app.delete("/books/:id", (req, res) => {
    const book = books.find(c => c.id === req.params.id);
    const index = books.indexOf(book);

    if (!book){
        res.status(404).send("A book with that Id does not exist");
        return;
    }
    books.splice(index, 1);
    res.send(books);

});

app.post("/books/:id/details", (req, res) => {
    const book = books.find(c => c.id === req.params.id);

    const bookDetail = {
        id: req.body.id,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear
    }
    book.details.push(bookDetail);
    res.send(book);

});

app.delete("books/:id/details/:detailId", (req, res) => {
    const book = books.find(c => c.id === req.params.id);
    const detail = book.find(d => d.id === req.params.detailId);
    const detailIndex = book.details.indexOf(detail);

    if (!detail){
        res.status(404).send("A book with that detail does not exist");
        return;
    }
    book.details.splice(detailIndex, 1);
    res.send(book);
})


app.listen(port, () => console.log("Listening on port 3000"));