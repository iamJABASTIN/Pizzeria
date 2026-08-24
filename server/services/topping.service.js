const Topping = require("../models/Topping");

const getAllToppings = async () => {
  return await Topping.find({})
    .select("name price isVeg image")
    .lean();
};

const createTopping = async (toppingData) => {
  return await Topping.create(toppingData);
};

module.exports = {
  getAllToppings,
  createTopping
};
