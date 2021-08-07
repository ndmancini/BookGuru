const express = require("express");
const { Op, EmptyResultError } = require("sequelize");
const { Book } = require("../db/models");
const bookController = require("../controllers/bookController");
const checkJWT = require("../middlewares/jwt");
const router = express.Router();

//Creamos un libro
router.post("/", bookController.book_create);

//Devolvemos 'n' libros random
router.get("/random/:n", bookController.book_getRandomBooks);

//Devolvemos un book por PK
router.get("/id/:id", bookController.book_getById);

//devolvemos todos los libros que matcheen con un título
router.get("/title/:title", bookController.book_getByTitle);

//devolvemos todos los libros de un auto
router.get("/author/:author", bookController.book_getByAuthor);

//Devolvemos los libros relacionados con una categoría
router.get("/category/:category", bookController.book_getByCategory);

//Devolvemos los libros relacionados con el autor y categoria
router.get("/author_title/:author_title", bookController.book_getByAuthorCategory);

//Borramos un libro por PK
router.delete("/id/:id", checkJWT, bookController.book_delete);

//Update de un libro
router.put("/id/:id", checkJWT, bookController.book_update);

//tramos el promedio de ratings de un libro
router.get('/ratings/:id', bookController.book_ratings)

module.exports = router;
