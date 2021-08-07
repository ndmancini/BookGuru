const { User, Order, Book } = require("../db/models");
const { col, Op } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {

  user_register: function (req, res) {
    User.create(req.body)
      .then((user) => {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          "fidelio"
        );
        res.status(200).json({ user, token });
      })
      .catch((err) => {
        res.send("User already exists!");
      });
  },

  user_login: function (req, res, next) {
    const { username, password } = req.body;

    User.findOne({ where: { username } }).then((user) => {
      if (!user)
        return res
          .status(400)
          .send("Username does not exists, please try again");
      if (!user.validPassword(password))
        return res.status(401).send("Password incorrect, please try again");

      const token = jwt.sign(
        { id: user.id, username: user.username },
        "fidelio"
      );
      return res.status(200).json({ user, token });
    });
  },

  user_getCart: function (req, res) {
    Order.findAll({
      where: { userId: req.params.userId, bought: false },
      include: Book,
      order: col("id"),
    }).then((cartOrders) => res.status(200).send(cartOrders));
  },

  user_checkoutOrder: function (req, res) {
    Order.findAll({
      where: { userId: req.params.userId, bought: true },
      include: Book,
    }).then((checkedOrders) => res.status(200).send(checkedOrders));
  },

  user_getAllUsers: function (req, res) {
    User.findAll({
      where: { id: { [Op.not]: req.params.userId } },
      order: col("id"),
    }).then((users) => res.status(200).send(users));
  },

  user_delete: function (req, res) {
    User.findByPk(req.body.userId).then((user) => {
      user.destroy().then(() => res.send(user));
    });
  },

  user_getUserByPk: function (req, res) {
    User.findByPk(req.params.userId)
      .then((user) => res.status(200).send(user))
      .catch((err) => res.status(400).send("User not found!"));
  },

  user_toggleAdminStatus: function (req, res) {
    User.findByPk(req.body.userId).then((user) => {
      user.toggleAdminStatus();
      res.send(user.dataValues);
    });
  },
  
};
