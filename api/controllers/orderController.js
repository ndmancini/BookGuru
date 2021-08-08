const { Order, User, Book } = require("../db/models");
const { Op } = require("sequelize");

module.exports = {

  // user_validation: function (req, res) {
  //   User.findByPk(req.user.id)
  //     .then((user) => {
  //       res.status(200).send(user);
  //     })
  //     .catch((err) => res.status(400).send("Please Login or Register"));
  // },

  order_creation: function (req, res) {
    const { userId, bookId } = req.body;
    Order.findOrCreate({
      where: { [Op.and]: [{ bookId }, { userId }, { bought: false }] },
      defaults: req.body,
    })
    .then((order) => {
      order[1]
        ? res.status(200).send(order[0])
        : res.status(400).send("Book already add to cart");
    });
  },

  order_checkout: function (req, res) {
    req.body.orders.forEach((order, index) => {
      Book.findByPk(order.bookId).then((singleBook) =>
        singleBook.reduceStock(order.quantity)
      );
    });
    const dateObj = new Date().toDateString().split(" ").splice(1).join(" ");
    Order.update(
      {
        bought: true,
        date: dateObj,
      },
      { where: { userId: req.body.userId, bought: false }, returning: true }
    )
      .then((updatedOrders) => res.status(200).send(updatedOrders))
      .catch((err) => res.status(400).send("Couldn't make the checkout"));
  },

  order_updateQuantity: function (req, res) {
    Order.update(
      {
        quantity: req.body.quantity,
      },
      { where: { id: req.body.orderId, bought: false }, returning: true }
    )
      .then((updatedOrders) => res.status(200).send(updatedOrders))
      .catch((err) => res.status(400).send("Couldn't update order"));
  },

  order_delete: function (req, res) {
    Order.destroy({ where: { id: req.body.orderId } }).then(() =>
      res.status(202).send("Order deleted")
    );
  },

  order_getAllOrders: function (req, res) {
    Order.findAll({
      where: { bought: true },
      include: [Book, User],
    }).then((checkedOrders) => res.status(200).send(checkedOrders));
  },

  // order_getAllPendingOrders: function (req, res) {
  //   Order.findAll({
  //     where: { bought: false },
  //     include: Book,
  //   }).then((pendingOrders) => res.status(200).send(pendingOrders));
  // },
  
};
