const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const pizzaRoutes = require("./routes/pizza.routes");
const toppingRoutes = require("./routes/topping.routes");
const orderRoutes = require("./routes/order.routes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("WELCOME TO Pizzeria API");
});

app.use("/api/pizzas", pizzaRoutes);
app.use("/api/toppings", toppingRoutes);
app.use("/api/orders", orderRoutes);

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

