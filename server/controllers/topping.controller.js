const toppingService = require("../services/topping.service");

const getAllToppings = async (req, res, next) => {
  try {
    const toppings = await toppingService.getAllToppings();
    res.status(200).json({
      success: true,
      data: toppings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllToppings
};
