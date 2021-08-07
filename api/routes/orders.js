const express = require("express");
const router = express.Router();
const checkJWT = require("../middlewares/jwt");
const orderController = require("../controllers/orderController");

// router.get("/", checkJWT, orderController.user_validation);

//Ruta para traer todas las ordenes
router.get("/all", checkJWT, orderController.user_validation);

//ruta llamada al agregar una order al carrito
router.post("/", checkJWT, orderController.order_creation);

//ruta llamada al comprar
router.put("/checkout", checkJWT, orderController.order_checkout);

//ruta llamada al actualizar cantidad
router.put("/quantity", checkJWT, orderController.order_updateQuantity);

//ruta que elimina una orden del carrito
router.delete("/", orderController.order_delete);

//Nos trae todas las ordenes con bought TRUE
router.get("/admin/checked", checkJWT, orderController.order_getAllOrders);

//Nos trae todas las ordenes con bought FALSE
router.get(
  "/admin/pending",
  checkJWT,
  orderController.order_getAllPendingOrders
);

module.exports = router;