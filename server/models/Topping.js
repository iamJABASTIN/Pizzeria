const mongoose = require("mongoose");

const toppingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Topping name is required"],
    trim: true,
    unique: true
  },
  price: {
    type: Number,
    required: [true, "Topping price is required"],
    min: [0, "Topping price must be positive"]
  },
  isVeg: {
    type: Boolean,
    required: [true, "Topping veggie status is required"]
  },
  image: {
    type: String,
    required: [true, "Topping image is required"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Topping", toppingSchema);
