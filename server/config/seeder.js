const Pizza = require("../models/Pizza");
const Topping = require("../models/Topping");

const seedPizzas = [
  {
    name: "Paneer Tikka",
    isVeg: true,
    price: 290,
    description: "This is popular italian pizza flavoured with marinated tikka sauce and paneer",
    ingredients: ["dough/flour", "pizza saucce", "pizza sauce seasoning", "cheese"],
    toppings: ["Paneer", "Fried Onion", "Green olive", "Capsicum", "Red peprika"],
    image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787316970/pizzeria-app/pizzas/paneer_tikka_pizza.jpg"
  },
  {
    name: "Chicken Italiana",
    isVeg: false,
    price: 350,
    description: "This is popular italian pizza flavoured with light sugary taste and creamy touch",
    ingredients: ["deep dish pizza mix", "pizza saucce", "pizza sauce seasoning", "cheese", "sugar and cinnamon blend", "plain butter"],
    toppings: ["Pepperoni", "Chicken", "Sausage", "Mushroom", "Capsicum", "Black beans"],
    image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787316981/pizzeria-app/pizzas/chicken_italiana_pizza.jpg"
  },
  {
    name: "Veggie Supreme",
    isVeg: true,
    price: 310,
    description: "This is popular italian pizza flavoured with crushed garlic, with multiple herbs topped up with sweet corn",
    ingredients: ["deep dish pizza mix", "pizza saucce", "pizza sauce seasoning", "cheese", "garlic herbs", "flavored butter"],
    toppings: ["Fried Onion", "Sweet corn", "Mushroom", "Capsicum", "Black olive"],
    image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787316994/pizzeria-app/pizzas/veggie_supreme_pizza.jpg"
  },
  {
    name: "Triple Chicken Feast",
    isVeg: false,
    price: 400,
    description: "This is popular italian pizza flavoured with unique greek dressing topped up with keema and meat ball",
    ingredients: ["low carb pizza dough", "pizza saucce", "pizza sauce seasoning", "cheese", "greek dressing", "cajun"],
    toppings: ["Chicken keema", "Fried Onion", "Chicken Meat ball", "Capsicum", "Sweet corn"],
    image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317010/pizzeria-app/pizzas/triple_chicken_feast_pizza.jpg"
  },
  {
    name: "Ultimate Chicken",
    isVeg: false,
    price: 625,
    description: "This is popular italian pizza flavoured with BBQ sauce, flavored butter. It has spongy base which gives unique taste with multiple toppings",
    ingredients: ["deep dish pizza mix", "pizza saucce", "pizza sauce seasoning", "cheese", "BBQ sauce", "cajun", "flavored butter"],
    toppings: ["Pepperoni", "Fried Onion", "Chicken Meat ball", "Chicken Sausage", "Chicken keama"],
    image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317027/pizzeria-app/pizzas/ultimate_chicken_pizza.jpg"
  }
];

const seedToppings = [
  { name: "Pepperoni", price: 110, isVeg: false, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317066/pizzeria-app/toppings/pepperoni_topping.jpg" },
  { name: "Mushroom", price: 35, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317057/pizzeria-app/toppings/mushroom_topping.jpg" },
  { name: "Black beans", price: 45, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787558401/black_beans.png" },
  { name: "Black olive", price: 35, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317088/pizzeria-app/toppings/black_olives_topping.jpg" },
  { name: "Green olive", price: 50, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787558400/green_olives.png" },
  { name: "Jalapeno", price: 45, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787558399/jalapeno.png" },
  { name: "Chicken", price: 60, isVeg: false, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317078/pizzeria-app/toppings/chicken_topping.jpg" },
  { name: "Tomato", price: 20, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787558408/tomato.png" },
  { name: "Red peprika", price: 30, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787558400/red_peparika.png" },
  { name: "Paneer", price: 45, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317036/pizzeria-app/toppings/paneer_topping.jpg" },
  { name: "Fried Onion", price: 18, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317098/pizzeria-app/toppings/onion_topping.jpg" },
  { name: "Capsicum", price: 15, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317046/pizzeria-app/toppings/capsicum_topping.jpg" },
  { name: "Sweet corn", price: 38, isVeg: true, image: "https://res.cloudinary.com/dn04pdikt/image/upload/v1787317112/pizzeria-app/toppings/sweet_corn_topping.jpg" }
];

const seedDatabase = async () => {
  try {
    await Pizza.deleteMany({});
    await Pizza.insertMany(seedPizzas);
    console.log("Database seeded successfully with pizzas!");

    await Topping.deleteMany({});
    await Topping.insertMany(seedToppings);
    console.log("Database seeded successfully with toppings!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

module.exports = seedDatabase;
