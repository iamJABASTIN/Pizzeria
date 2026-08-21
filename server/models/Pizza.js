const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pizza name is required"],
    trim: true,
    unique: true
  },
  isVeg: {
    type: Boolean,
    required: [true, "Veg status is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required"]
  },
  toppings: {
    type: [String],
    required: [true, "Toppings are required"]
  },
  image: {
    type: String,
    required: [true, "Image URL/path is required"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Pizza", pizzaSchema);
