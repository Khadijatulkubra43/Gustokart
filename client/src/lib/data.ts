import heroImage from "@assets/generated_images/gustokart_hero_food_spread.png";
import biryaniImage from "@assets/generated_images/chicken_biryani_dish.png";
import karahiImage from "@assets/generated_images/chicken_karahi_dish.png";
// import pastaImage from "@assets/generated_images/gourmet_pasta_dish.png";
// import bbqImage from "@assets/generated_images/bbq_platter.png";
import chefImage from "@assets/generated_images/professional_chef_portrait.png";
import haleem from "../../public/Haleem.png"
import korma from "../../public/korma.png"
import nihari from "../../public/nihari.png"

export interface Ingredient {
  name: string;
  price: number;
  selected?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  time: string;
  calories: string;
  rating: number;
  ingredients: Ingredient[];
  steps: string[];
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice layered with spiced chicken and caramelized onions.",
    price: 12.99,
    image: biryaniImage,
    category: "Rice",
    time: "45 mins",
    calories: "650 kcal",
    rating: 4.9,
    ingredients: [
      { name: "Basmati Rice", price: 2.5 },
      { name: "Salt", price: 0.1 },
      { name: "Cumin Seeds", price: 0.3 },
      { name: "Cloves", price: 0.2 },
      { name: "Black Peppercorns", price: 0.2 },
      { name: "Green Cardamom", price: 0.4 },
      { name: "Black Cardamom", price: 0.3 },
      { name: "Bay Leaves", price: 0.2 },
      { name: "Cinnamon Sticks", price: 0.3 },
      { name: "Chicken / Beef", price: 5.0 },
      { name: "Oil", price: 0.5 },
      { name: "Onions", price: 0.6 },
      { name: "Ginger Garlic Paste", price: 0.4 },
      { name: "Tomatoes", price: 0.5 },
      { name: "Yogurt", price: 0.6 },
      { name: "Red Chili Powder", price: 0.2 },
      { name: "Turmeric Powder", price: 0.2 },
      { name: "Ground Coriander", price: 0.3 },
      { name: "Ground Cumin", price: 0.3 },
      { name: "Garam Masala", price: 0.4 },
      { name: "Green Chilies", price: 0.2 },
      { name: "Salt", price: 0.1 },
      { name: "Fresh Coriander (Cilantro)", price: 0.3 },
      { name: "Mint Leaves", price: 0.3 },
      { name: "Fried Onions (Birista)", price: 0.5 },
      { name: "Dried Prunes (Aloo Bukhara)", price: 0.4 },
      { name: "Lemon Slices / Juice", price: 0.2 },
      { name: "Yellow Food Coloring (Optional)", price: 0.2 },
      { name: "Biryani / Kewra Essence (Optional)", price: 0.3 },
      { name: "Potatoes (Optional)", price: 0.5 }
    ],
    steps: [
      "Wash and soak basmati rice for 30 minutes",
      "Boil water with salt and whole spices, then cook rice until 70% done and drain",
      "Heat oil in a pan, fry onions until golden brown",
      "Add ginger- garlic paste and sauté",
      "Add tomatoes and cook until soft",
      "Mix in yogurt and spices(red chili, turmeric, coriander, cumin, garam masala)",
      "Add chicken or beef and cook until tender",
      "Add green chilies and adjust salt",
      "In a heavy - bottomed pot, layer partially cooked rice over meat curry",
      "Sprinkle fried onions, mint, and coriander leaves",
      "Add dried prunes and potatoes if using",
      "Optionally add yellow food coloring and kewra / biryani essence",
      "Cover tightly and cook on low heat(dum) until rice and meat are fully cooked",
      "Garnish with lemon slices, extra fried onions, and fresh herbs",
      "Serve hot with raita or salad"
    ]
  },
  {
    id: "2",
    name: "Chicken Karahi",
    description: "Spicy and tangy chicken cooked in a wok with fresh tomatoes and ginger.",
    price: 14.99,
    image: karahiImage,
    category: "Curry",
    time: "30 mins",
    calories: "550 kcal",
    rating: 4.8,
    ingredients: [
      { name: "Chicken", price: 5.0 },
      { name: "Tomatoes", price: 1.0 },
      { name: "Green Chillies", price: 0.3 },
      { name: "Oil / Ghee", price: 0.8 },
      { name: "Ginger Garlic Paste", price: 0.5 },
      { name: "Salt", price: 0.1 },
      { name: "Red Chilli Powder", price: 0.3 },
      { name: "Black Pepper", price: 0.3 },
      { name: "Cumin", price: 0.2 },
      { name: "Coriander Powder", price: 0.3 },
      { name: "Garam Masala", price: 0.4 },
      { name: "Fresh Coriander", price: 0.3 },
      { name: "Ginger (Julienne)", price: 0.2 },
      { name: "Lemon (Optional)", price: 0.2 },
      { name: "National Karahi Masala Mix (Optional)", price: 0.6 }
    ],
    steps: [
      "Heat oil or ghee in a karahi or pan",
      "Fry onions until soft (if using)",
      "Add ginger-garlic paste and sauté",
      "Add chicken and cook until lightly browned",
      "Add tomatoes and green chilies",
      "Mix in salt and spices (red chili, black pepper, cumin, coriander, garam masala)",
      "Add optional National Karahi Masala Mix if using",
      "Cook until chicken is fully cooked and oil separates",
      "Garnish with fresh coriander, ginger julienne, and lemon slices",
      "Serve hot with naan, roti, or rice",
    ]
  },
  {
    id: "3",
    name: "Nihari",
    description: "A rich, slow-cooked Pakistani beef stew infused with aromatic spices.",
    price: 11.99,
    image: nihari,
    category: "Nihari",
    time: "25 mins",
    calories: "700 kcal",
    rating: 4.7,
    ingredients: [
      { name: "Beef Shank (Nehari Cut)", price: 8.0 },
      { name: "Bones (Marrow Bones)", price: 3.0 },
      { name: "Oil / Ghee", price: 1.0 },
      { name: "Onions (Optional)", price: 0.5 },
      { name: "Ginger Garlic Paste", price: 0.5 },
      { name: "Wheat Flour (Atta) for Thickening", price: 0.2 },
      { name: "Water", price: 0.0 },
      { name: "Ginger (Julienne)", price: 0.3 },
      { name: "Fresh Coriander", price: 0.3 },
      { name: "Lemon", price: 0.2 },
      { name: "Green Chillies", price: 0.3 },
      { name: "Salt", price: 0.1 },
      { name: "Red Chilli Powder", price: 0.3 },
      { name: "Turmeric", price: 0.2 },
      { name: "Coriander Powder", price: 0.3 },
      { name: "Fennel (Saunf)", price: 0.2 },
      { name: "Cloves", price: 0.2 },
      { name: "Cinnamon", price: 0.2 },
      { name: "Black Cardamom", price: 0.3 },
      { name: "Green Cardamom", price: 0.3 },
      { name: "Bay Leaf", price: 0.2 },
      { name: "Black Pepper", price: 0.3 },
      { name: "Nutmeg + Mace (Jaifal + Javitri)", price: 0.4 },
      { name: "Nihari Masala (Ready-Made, Optional)", price: 0.6 }
    ],
    steps: [
      "Heat oil or ghee in a heavy-bottomed pot",
      "Fry onions if using",
      "Add ginger-garlic paste and sauté",
      "Add beef shank and marrow bones",
      "Mix in salt and all the spices",
      "Add wheat flour (atta) for thickening",
      "Pour in water and bring to a boil",
      "Simmer on low heat for several hours until meat is tender",
      "Add optional ready-made Nihari masala if desired",
      "Garnish with ginger julienne, fresh coriander, lemon slices, and green chilies",
      "Serve hot with naan or paratha",
    ]
  },
  {
    id: "4",
    name: "Korma",
    description: "A creamy, mildly spiced South Asian curry made with meat , yogurt, and aromatic spices.",
    price: 19.99,
    image: korma,
    category: "korma",
    time: "40 mins",
    calories: "800 kcal",
    rating: 4.9,
    ingredients: [
      { name: "Chicken or Beef", price: 6.0 },
      { name: "Oil / Ghee", price: 1.0 },
      { name: "Onions (Fried, Crushed)", price: 0.7 },
      { name: "Yogurt", price: 0.6 },
      { name: "Ginger Garlic Paste", price: 0.5 },
      { name: "Kewra Water (Optional)", price: 0.3 },
      { name: "Almonds / Cashews Paste (Optional)", price: 1.0 },
      { name: "Salt", price: 0.1 },
      { name: "Red Chilli Powder", price: 0.3 },
      { name: "Turmeric", price: 0.2 },
      { name: "Coriander Powder", price: 0.3 },
      { name: "Garam Masala", price: 0.4 },
      { name: "Black Cardamom", price: 0.3 },
      { name: "Green Cardamom", price: 0.3 },
      { name: "Cloves", price: 0.2 },
      { name: "Cinnamon", price: 0.2 },
      { name: "Bay Leaf", price: 0.2 },
      { name: "Black Pepper", price: 0.3 },
      { name: "Nutmeg + Mace (Jaifal + Javitri)", price: 0.4 }
    ],
    steps: [
      "Heat oil or ghee in a pan",
      "Fry onions until golden brown",
      "Add ginger-garlic paste and sauté",
      "Add chicken or beef and cook until lightly browned",
      "Add yogurt and mix well",
      "Add salt and spices (red chili, turmeric, coriander, garam masala, cardamoms, cloves, cinnamon, bay leaf, black pepper, nutmeg + mace)",
      "Add optional kewra water and almond/cashew paste for richness",
      "Simmer on low heat until meat is tender and gravy is thick",
      "Garnish with fresh coriander (optional)",
      "Serve hot with naan, roti, or rice",
    ]
  },
  {
    id: "5",
    name: "Haleem",
    description: "A thick, savory porridge of meat, lentils, and wheat, slow-cooked with spices for a rich, hearty flavor.",
    price: 19.99,
    image: haleem,
    category: "haleem",
    time: "40 mins",
    calories: "800 kcal",
    rating: 4.9,
    ingredients: [
      { name: "Beef or Chicken", price: 6.0 },
      { name: "Wheat Grains (Cracked Wheat / Dalia)", price: 1.0 },
      { name: "Barley", price: 0.8 },
      { name: "Oats (Optional)", price: 0.5 },
      { name: "Mixed Lentils (Chana dal, Masoor dal, Moong dal, Mash dal)", price: 1.2 },
      { name: "Oil / Ghee", price: 1.0 },
      { name: "Onions (Fried)", price: 0.7 },
      { name: "Ginger Garlic Paste", price: 0.5 },
      { name: "Salt", price: 0.1 },
      { name: "Red Chilli Powder", price: 0.3 },
      { name: "Turmeric", price: 0.2 },
      { name: "Coriander Powder", price: 0.3 },
      { name: "Garam Masala", price: 0.4 },
      { name: "Cumin", price: 0.2 },
      { name: "Nihari / Haleem Masala (Optional)", price: 0.6 },
      { name: "Fried Onions (Garnish)", price: 0.5 },
      { name: "Ginger (Julienne, Garnish)", price: 0.2 },
      { name: "Fresh Coriander (Garnish)", price: 0.3 },
      { name: "Lemon (Garnish)", price: 0.2 },
      { name: "Green Chillies (Garnish)", price: 0.3 },
      { name: "Chaat Masala (Optional, Garnish)", price: 0.2 }
    ],
    steps: [
      "Heat oil or ghee in a large pot",
      "Fry onions until golden brown",
      "Add ginger-garlic paste and sauté",
      "Add chicken or beef and cook until lightly browned",
      "Add all lentils, wheat, barley, and oats (if using)",
      "Mix in salt and all spices (red chili, turmeric, coriander, garam masala, cumin)",
      "Add water and simmer on low heat until meat and grains are fully cooked and blended",
      "Add optional  Haleem masala if desired",
      "Blend or mash mixture to desired consistency",
      "Garnish with fried onions, ginger julienne, fresh coriander, lemon, green chilies, and optional chaat masala",
      "Serve hot with naan, roti, or rice",
    ]
  }
];

export const chefs = [
  {
    id: "1",
    name: "Chef Antonio",
    role: "Head Chef",
    image: chefImage,
    bio: "Expert in fusion cuisine with over 15 years of experience."
  }
];

export { heroImage };
