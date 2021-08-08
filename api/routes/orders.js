const express = require("express");
const router = express.Router();
const checkJWT = require("../middlewares/jwt");
const orderController = require("../controllers/orderController");

//Ruta para traer todas las ordenes
// router.get("/all", checkJWT, orderController.user_validation);

//adds book to cart (Creates an order)
router.post("/", checkJWT, orderController.order_creation);

//checkout order (buy book)
router.put("/checkout", checkJWT, orderController.order_checkout);

//updates quantity of books in an order
router.put("/quantity", checkJWT, orderController.order_updateQuantity);

//deletes an order of the book
router.delete("/", orderController.order_delete);

//gets all history of orders checked (for admin only)
router.get("/admin/checked", checkJWT, orderController.order_getAllOrders);

//Nos trae todas las ordenes con bought FALSE
// router.get(
//   "/admin/pending",
//   checkJWT,
//   orderController.order_getAllPendingOrders
// );

module.exports = router;