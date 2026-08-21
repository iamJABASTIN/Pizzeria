const pizzaService = require("../services/pizza.service");

const getAllPizzas = async (req, res, next) => {
  try {
    const pizzas = await pizzaService.getAllPizzas();
    res.status(200).json({
      success: true,
      data: pizzas
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPizzas
};
