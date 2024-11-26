const express = require('express');
const {
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
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.get('/isbn/:isbn', getBookByISBN);
router.get('/author/:author', getBooksByAuthor);
router.get('/title/:title', getBooksByTitle);
router.get('/reviews/:isbn', getBookReview);
router.post('/reviews/:isbn', addOrUpdateReview);
router.delete('/reviews/:isbn', deleteReview);
router.get('/async-callback', getBooksAsync);
router.get('/promises/:isbn', getBookByISBNP);
router.get('/async-await/author/:author', getBooksByAuthorA);
router.get('/async-await/title/:title', getBooksByTitleA);



module.exports = router;
