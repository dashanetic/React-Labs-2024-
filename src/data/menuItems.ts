import burgerClassic from "../assets/images/Burger_Classic.png";
import burgerDreams from "../assets/images/Burger_Dreams.png";
import burgerSpicy from "../assets/images/Burger_Spicy.png";
import burgerWaldo from "../assets/images/Burger_Waldo.png";
import burgerCali from "../assets/images/Burger_Cali.png";
import burgerBaconBuddy from "../assets/images/Burger_Bacon_Buddy.png";

export type MenuCategory = "Breakfast" | "Lunch" | "Dinner" | "Dessert";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Burger Classic",
    price: 8.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dinner",
    image: burgerClassic,
  },
  {
    id: 2,
    name: "Burger Dreams",
    price: 9.2,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dinner",
    image: burgerDreams,
  },
  {
    id: 3,
    name: "Burger Spicy",
    price: 9.2,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dinner",
    image: burgerSpicy,
  },
  {
    id: 4,
    name: "Burger Waldo",
    price: 10.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dinner",
    image: burgerWaldo,
  },
  {
    id: 5,
    name: "Burger Cali",
    price: 8.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dinner",
    image: burgerCali,
  },
  {
    id: 6,
    name: "Burger Bacon Buddy",
    price: 9.99,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dinner",
    image: burgerBaconBuddy,
  },
  {
    id: 7,
    name: "Morning Burger",
    price: 7.5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Breakfast",
    image: burgerWaldo,
  },
  {
    id: 8,
    name: "Sunrise Sandwich",
    price: 6.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Breakfast",
    image: burgerCali,
  },
  {
    id: 9,
    name: "Breakfast Buddy",
    price: 8.99,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Breakfast",
    image: burgerBaconBuddy,
  },
  {
    id: 10,
    name: "Sweet Dream Cake",
    price: 5.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dessert",
    image: burgerClassic,
  },
  {
    id: 11,
    name: "Berry Blast",
    price: 4.5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dessert",
    image: burgerDreams,
  },
  {
    id: 12,
    name: "Ice Cream Paradise",
    price: 6.2,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Dessert",
    image: burgerSpicy,
  },
];

export default menuItems;
