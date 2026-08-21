const Pizza = require("../models/Pizza");

const getAllPizzas = async () => {
  return await Pizza.find({})
    .select("name isVeg price description ingredients toppings image")
    .lean();
};

const createPizza = async (pizzaData) => {
  return await Pizza.create(pizzaData);
};

module.exports = {
  getAllPizzas,
  createPizza
};
