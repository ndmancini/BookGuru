const express = require("express");
const { Op, EmptyResultError } = require("sequelize");
const { Book } = require("../db/models");
const bookController = require("../controllers/bookController");
const checkJWT = require("../middlewares/jwt");
const router = express.Router();

//creates a new books
router.post("/", bookController.book_create);

//gets 'n' random books
router.get("/random/:n", bookController.book_getRandomBooks);

//find book by Id
router.get("/id/:id", bookController.book_getById);

//Devolvemos los libros relacionados con una categoría
router.get("/category/:category", bookController.book_getByCategory);

//get books by author or title
router.get("/author_title/:author_title", bookController.book_getByTitleOrAuthor);

//delete a book by Id
router.delete("/id/:id", checkJWT, bookController.book_delete);

//update a book
router.put("/id/:id", checkJWT, bookController.book_update);

//get average ratings of a book
router.get('/ratings/:id', bookController.book_ratings)

module.exports = router;
