const express = require("express");
const router = express.Router();
const users = require('./users')
const User = require('../db/models/user')

// const books = require("./books");

// router.use("/users", books);

router.use("/users", users);




module.exports = router;