const { Op, literal } = require("sequelize");
const { Book } = require("../db/models");

module.exports = {
  book_create: function (req, res) {
    Book.create(req.body)
      .then((book) => res.status(200).json(book))
      .catch((err) => {
        res.send("book already exists!");
      });
  },

  book_getRandomBooks: function (req, res) {
    Book.findAll({ order: literal("random()"), limit: req.params.n }).then(
      (books) => {
        res.send(books);
      }
    );
  },

  book_getById: function (req, res) {
    Book.findByPk(req.params.id)
      .then((book) => res.status(200).send(book))
      .catch((err) => res.status(400).send("Book not found!"));
  },

  book_getByTitle: function (req, res) {
    Book.findAll({
      where: { title: { [Op.iLike]: `%${req.params.title}%` } },
    }).then((books) => res.send(books));
  },

  book_getByAuthor: function (req, res) {
    Book.findAll({
      where: { author: { [Op.iLike]: `%${req.params.author}%` } },
    }).then((books) => res.send(books));
  },

  book_getByCategory: function (req, res) {
    Book.findAll({
      where: { category: { [Op.iLike]: `%${req.params.category}%` } },
    }).then((books) => res.send(books));
  },

  book_getByAuthorCategory: function (req, res) {
    Book.findAll({
      where: {
        [Op.or]: [
          { author: { [Op.iLike]: `%${req.params.author_title}%` } },
          { title: { [Op.iLike]: `%${req.params.author_title}%` } },
        ],
      },
    })
      .then((books) => res.send(books))
      .catch((err) => res.send("Book not found!"));
  },

  book_delete: function (req, res) {
    Book.destroy({ where: { id: req.params.id } })
      .then(() => res.status(202).send("Book deleted"))
      .catch((err) => res.send("Book not found!"));
  },

  book_update: function (req, res) {
    Book.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
      .then((updatedBook) => res.status(202).send(updatedBook[1]))
      .catch((err) => res.status(400).send(err));
  },

  book_ratings: function (req, res) {
    Book.findByPk(req.params.id).then((book) =>
      book.getRatings().then((ratings) => {
        ratings = ratings.map((rating) => rating.dataValues.value);
        const result =
          ratings.reduce((acum, val) => acum + val, 0) / ratings.length;
        res.json(result);
      })
    );
  },
};
