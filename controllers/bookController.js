const books = require('../models/books');

const getBooks = (req, res) => {
    res.json(books);
};

const getBookByISBN = (req, res) => {
    const { isbn } = req.params;
    const book = books.find((b) => b.isbn === isbn);
    if (book) res.json(book);
    else res.status(404).json({ message: "Book not found" });
};

const getBooksByAuthor = (req, res) => {
    const { author } = req.params;
    const result = books.filter((b) => b.author === author);
    res.json(result);
};

const getBooksByTitle = (req, res) => {
    const { title } = req.params;
    const result = books.filter((b) => b.title.includes(title));
    res.json(result);
};

const getBookReview = (req, res) => {
    const { isbn } = req.params;
    const book = books.find((b) => b.isbn === isbn);
    if (book) res.json(book.reviews);
    else res.status(404).json({ message: "Book not found" });
};

const addOrUpdateReview = (req, res) => {
    const { isbn } = req.params;
    const { username, review } = req.body;
    const book = books.find((b) => b.isbn === isbn);

    if (book) {
        const existingReview = book.reviews.find((r) => r.username === username);
        if (existingReview) {
            existingReview.review = review;
        } else {
            book.reviews.push({ username, review });
        }
        res.json({ message: "Review added/updated", reviews: book.reviews });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
};

const deleteReview = (req, res) => {
    const { isbn } = req.params;
    const { username } = req.body;
    const book = books.find((b) => b.isbn === isbn);

    if (book) {
        book.reviews = book.reviews.filter((r) => r.username !== username);
        res.json({ message: "Review deleted", reviews: book.reviews });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
};

const getAllBooksAsync = async (callback) => {
    try {
        const books = require('../models/books');
        setTimeout(() => {
            callback(null, books);
        }, 1000);
    } catch (error) {
        callback(error);
    }
};

const getBooksAsync = (req, res) => {
    getAllBooksAsync((error, books) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching books", error });
        }
        res.json(books);
    });
};

const getBookByISBNPromise = (isbn) => {
    return new Promise((resolve, reject) => {
        const books = require('../models/books');
        const book = books.find((b) => b.isbn === isbn);

        if (book) {
            resolve(book); 
        } else {
            reject({ message: "Book not found" });
        }
    });
};

const getBookByISBNP = (req, res) => {
    const { isbn } = req.params;

    getBookByISBNPromise(isbn)
        .then((book) => res.json(book))
        .catch((error) => res.status(404).json(error));
};

const getBooksByAuthorAsync = async (author) => {
    const books = require('../models/books');
    return books.filter((b) => b.author.toLowerCase() === author.toLowerCase());
};

const getBooksByAuthorA = async (req, res) => {
    const { author } = req.params;

    try {
        const books = await getBooksByAuthorAsync(author);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

const getBooksByTitleAsync = async (title) => {
    const books = require('../models/books');
    return books.filter((b) => b.title.toLowerCase().includes(title.toLowerCase()));
};

const getBooksByTitleA = async (req, res) => {
    const { title } = req.params;

    try {
        const books = await getBooksByTitleAsync(title);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

module.exports = {
    getBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrUpdateReview,
    deleteReview,
    getBooksAsync,
    getBookByISBNP,
    getBooksByAuthorA,
    getBooksByTitleA
};
