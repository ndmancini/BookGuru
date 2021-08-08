const express = require("express");
const router = express.Router();
const checkJWT = require("../middlewares/jwt");
const userController = require('../controllers/userController')

//creates a new user
router.post("/register", userController.user_register)

//login existing user
router.post("/login", userController.user_login)

//gets user's cart
router.get("/:userId/cart", checkJWT, userController.user_getCart)

//gets user by its ID
router.get("/user/:userId", checkJWT, userController.user_getUserByPk)

//gets user's old orders
router.get("/:userId/checked", checkJWT, userController.user_checkoutOrder) 

//gets all users (for admin only)
router.get("/all/:userId", checkJWT, userController.user_getAllUsers) 

//deteles a user (for admin only)
router.delete("/", checkJWT, userController.user_delete)

//toggles user's isAdmin bool property (for admin only)
router.put("/toggleAdmin", checkJWT, userController.user_toggleAdminStatus)

module.exports = router;