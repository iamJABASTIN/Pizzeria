const express = require("express");
const router = express.Router();
const pizzaController = require("../controllers/pizza.controller");

router.get("/", pizzaController.getAllPizzas);

module.exports = router;
