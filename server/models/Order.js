const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  pizza: {
    name: {
      type: String,
      required: [true, "Pizza name is required"],
      trim: true
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
      trim: true
    },
    ingredients: {
      type: [String]
    },
    toppings: {
      type: [String]
    },
    image: {
      type: String
    }
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"]
  }
});

const orderSchema = new mongoose.Schema({
  items: {
    type: [orderItemSchema],
    required: [true, "Order items are required"]
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
    min: [0, "Total price must be positive"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
