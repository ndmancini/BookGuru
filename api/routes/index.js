const express = require("express");
const router = express.Router();
const users = require("./users");
const books = require("./books");
const orders = require("./orders");
const ratings = require("./ratings");

router.use("/users", users);
router.use("/books", books);
router.use("/ratings", ratings);
router.use("/orders", orders);

module.exports = router;
