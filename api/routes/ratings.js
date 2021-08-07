const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Rating } = require("../db/models");
const checkJWT = require("../middlewares/jwt");

router.post("/", checkJWT, (req, res) => {
  const { userId, bookId } = req.body;
  Rating.findOrCreate({
    where: { [Op.and]: [{ userId }, { bookId }] },
    defaults: req.body,
  }).then((rating) => {
    rating[1]
      ? res.status(200).send(Number(rating[0]).toFixed(1))
      : res.status(400).send("Book already rated");
  });
});

module.exports = router;
