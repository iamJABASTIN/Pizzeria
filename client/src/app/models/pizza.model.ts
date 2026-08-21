export interface Pizza {
  _id: string;
  name: string;
  isVeg: boolean;
  price: number;
  description: string;
  ingredients: string[];
  toppings: string[];
  image: string;
}
