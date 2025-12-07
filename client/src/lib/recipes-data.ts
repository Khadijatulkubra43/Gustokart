export interface RecipeData {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  rating: number;
  featured: boolean;
  ingredients: IngredientData[];
  steps: string[];
}

export interface IngredientData {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  price: number;
}

export const recipes: RecipeData[] = [
  {
    id: "biryani",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice layered with tender chicken, fragrant spices, and caramelized onions. A royal feast from the Mughal kitchens.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop",
    category: "Rice Dishes",
    prepTime: "30 mins",
    cookTime: "45 mins",
    servings: 4,
    rating: 4.9,
    featured: true,
    ingredients: [
      { id: "biryani-1", name: "Basmati Rice", quantity: "2", unit: "cups", price: 3.99 },
      { id: "biryani-2", name: "Chicken Thighs", quantity: "500", unit: "g", price: 8.99 },
      { id: "biryani-3", name: "Yogurt", quantity: "1", unit: "cup", price: 2.49 },
      { id: "biryani-4", name: "Onions", quantity: "3", unit: "large", price: 1.99 },
      { id: "biryani-5", name: "Ginger-Garlic Paste", quantity: "2", unit: "tbsp", price: 2.99 },
      { id: "biryani-6", name: "Biryani Masala", quantity: "2", unit: "tbsp", price: 3.49 },
      { id: "biryani-7", name: "Saffron", quantity: "1", unit: "pinch", price: 4.99 },
      { id: "biryani-8", name: "Ghee", quantity: "4", unit: "tbsp", price: 5.99 },
      { id: "biryani-9", name: "Fresh Mint", quantity: "1", unit: "bunch", price: 1.99 },
      { id: "biryani-10", name: "Fresh Cilantro", quantity: "1", unit: "bunch", price: 1.49 },
    ],
    steps: [
      "Wash and soak basmati rice for 30 minutes. Drain and set aside.",
      "Marinate chicken with yogurt, ginger-garlic paste, biryani masala, and salt for at least 1 hour.",
      "Slice onions thinly and fry in ghee until golden brown and crispy. Set aside half for garnish.",
      "In the same pan, add marinated chicken and cook until 70% done.",
      "Boil water with whole spices and cook rice until 70% done. Drain immediately.",
      "Layer the partially cooked rice over the chicken. Add saffron milk, fried onions, mint, and cilantro.",
      "Cover tightly and cook on low heat (dum) for 25 minutes.",
      "Let it rest for 5 minutes, then gently mix and serve hot with raita."
    ]
  },
  {
    id: "karahi",
    name: "Chicken Karahi",
    description: "A fiery Pakistani wok dish with tender chicken, fresh tomatoes, green chilies, and aromatic spices. Perfect with fresh naan.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=600&fit=crop",
    category: "Main Course",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    rating: 4.8,
    featured: true,
    ingredients: [
      { id: "karahi-1", name: "Chicken", quantity: "1", unit: "kg", price: 12.99 },
      { id: "karahi-2", name: "Tomatoes", quantity: "4", unit: "large", price: 3.99 },
      { id: "karahi-3", name: "Green Chilies", quantity: "6", unit: "pieces", price: 0.99 },
      { id: "karahi-4", name: "Ginger", quantity: "2", unit: "inch", price: 1.49 },
      { id: "karahi-5", name: "Garlic", quantity: "8", unit: "cloves", price: 0.99 },
      { id: "karahi-6", name: "Cumin Seeds", quantity: "1", unit: "tsp", price: 1.99 },
      { id: "karahi-7", name: "Coriander Powder", quantity: "2", unit: "tbsp", price: 2.49 },
      { id: "karahi-8", name: "Red Chili Powder", quantity: "1", unit: "tbsp", price: 1.99 },
      { id: "karahi-9", name: "Oil", quantity: "1/2", unit: "cup", price: 2.99 },
      { id: "karahi-10", name: "Fresh Cilantro", quantity: "1", unit: "bunch", price: 1.49 },
    ],
    steps: [
      "Heat oil in a karahi or wok over high heat.",
      "Add chicken pieces and stir-fry until golden brown.",
      "Add chopped tomatoes, ginger, and garlic. Cook until tomatoes are soft.",
      "Add all spices and salt. Mix well and cook for 5 minutes.",
      "Reduce heat to medium, cover and cook until chicken is tender.",
      "Add julienned ginger and green chilies. Stir for 2 minutes.",
      "Garnish with fresh cilantro and serve hot with naan."
    ]
  },
  {
    id: "Nihari",
    name: "Nihari",
    description: "Nihari is a traditional slow-cooked meat curry, simmered for hours with aromatic spices to create a deep, hearty flavor loved across Pakistan.",
    image: "../../public/nihari.png",
    category: "Main Course",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 2,
    rating: 4.7,
    featured: true,
    ingredients: [
     { id: "nihari-1", name: "Beef Shank", quantity: "1", unit: "kg", price: 12.99 },
  { id: "nihari-2", name: "Onions", quantity: "2", unit: "large", price: 1.99 },
  { id: "nihari-3", name: "Ginger-Garlic Paste", quantity: "2", unit: "tbsp", price: 2.49 },
  { id: "nihari-4", name: "Red Chili Powder", quantity: "2", unit: "tsp", price: 1.49 },
  { id: "nihari-5", name: "Turmeric Powder", quantity: "1", unit: "tsp", price: 0.99 },
  { id: "nihari-6", name: "Coriander Powder", quantity: "2", unit: "tsp", price: 1.29 },
  { id: "nihari-7", name: "Nihari Masala / Garam Masala", quantity: "3", unit: "tbsp", price: 4.99 },
  { id: "nihari-8", name: "Oil / Ghee", quantity: "1/2", unit: "cup", price: 3.99 },
  { id: "nihari-9", name: "Salt", quantity: "to taste", unit: "", price: 0.49 },
  { id: "nihari-10", name: "Water", quantity: "6", unit: "cups", price: 0 },
  { id: "nihari-11", name: "Fresh Coriander", quantity: "1/2", unit: "cup", price: 1.49 },
  { id: "nihari-12", name: "Ginger Slices", quantity: "2", unit: "tbsp", price: 0.99 },
  { id: "nihari-13", name: "Green Chilies", quantity: "4", unit: "pcs", price: 0.99 },
  { id: "nihari-14", name: "Lemon Wedges", quantity: "2", unit: "pcs", price: 0.69 },
    ],
   steps :[
  "Heat oil or ghee in a heavy pot and fry sliced onions until golden brown.",
  "Add ginger-garlic paste and sauté for 2 minutes until fragrant.",
  "Add beef shank or mutton and brown on all sides.",
  "Stir in red chili powder, turmeric, coriander powder, Nihari masala, and salt.",
  "Pour in water, bring to a boil, then reduce heat to low and cover.",
  "Simmer slowly for 6–8 hours, or use a pressure cooker for 1–2 hours until meat is tender and falling off the bone.",
  "Stir occasionally, adding more water if needed to maintain a stew-like consistency.",
  "Garnish with fresh coriander, ginger slices, green chilies, and serve with lemon wedges and naan or paratha."
]

  },
  // {
  //   id: "bbq-ribs",
  //   name: "BBQ Beef Ribs",
  //   description: "Fall-off-the-bone tender beef ribs glazed with a smoky, sweet barbecue sauce. Perfect for weekend cookouts.",
  //   image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop",
  //   category: "BBQ",
  //   prepTime: "20 mins",
  //   cookTime: "3 hours",
  //   servings: 4,
  //   rating: 4.9,
  //   featured: true,
  //   ingredients: [
  //     { id: "bbq-1", name: "Beef Short Ribs", quantity: "2", unit: "kg", price: 24.99 },
  //     { id: "bbq-2", name: "BBQ Sauce", quantity: "2", unit: "cups", price: 5.99 },
  //     { id: "bbq-3", name: "Brown Sugar", quantity: "1/4", unit: "cup", price: 2.49 },
  //     { id: "bbq-4", name: "Smoked Paprika", quantity: "2", unit: "tbsp", price: 3.49 },
  //     { id: "bbq-5", name: "Garlic Powder", quantity: "1", unit: "tbsp", price: 2.99 },
  //     { id: "bbq-6", name: "Onion Powder", quantity: "1", unit: "tbsp", price: 2.99 },
  //     { id: "bbq-7", name: "Cayenne Pepper", quantity: "1", unit: "tsp", price: 1.99 },
  //     { id: "bbq-8", name: "Apple Cider Vinegar", quantity: "1/4", unit: "cup", price: 3.49 },
  //   ],
  //   steps: [
  //     "Mix all dry spices to create a rub. Generously coat ribs and let sit for 1 hour.",
  //     "Preheat oven to 275°F (135°C).",
  //     "Place ribs on a baking sheet lined with foil. Cover tightly with foil.",
  //     "Bake for 2.5 hours until meat is tender but not falling off the bone.",
  //     "Mix BBQ sauce with brown sugar and apple cider vinegar.",
  //     "Uncover ribs, brush generously with sauce. Increase heat to 400°F (200°C).",
  //     "Bake uncovered for 20-30 minutes, basting every 10 minutes until caramelized.",
  //     "Let rest 10 minutes before cutting. Serve with extra sauce."
  //   ]
  // },
  // {
  //   id: "butter-chicken",
  //   name: "Butter Chicken",
  //   description: "Creamy, mildly spiced tomato-based curry with tender tandoori chicken pieces. A crowd favorite from North India.",
  //   image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=600&fit=crop",
  //   category: "Main Course",
  //   prepTime: "20 mins",
  //   cookTime: "35 mins",
  //   servings: 4,
  //   rating: 4.8,
  //   featured: false,
  //   ingredients: [
  //     { id: "butter-1", name: "Chicken Breast", quantity: "500", unit: "g", price: 9.99 },
  //     { id: "butter-2", name: "Heavy Cream", quantity: "1", unit: "cup", price: 3.99 },
  //     { id: "butter-3", name: "Tomato Puree", quantity: "2", unit: "cups", price: 2.99 },
  //     { id: "butter-4", name: "Butter", quantity: "4", unit: "tbsp", price: 3.49 },
  //     { id: "butter-5", name: "Garam Masala", quantity: "2", unit: "tsp", price: 3.99 },
  //     { id: "butter-6", name: "Kashmiri Chili", quantity: "1", unit: "tbsp", price: 2.99 },
  //     { id: "butter-7", name: "Ginger-Garlic Paste", quantity: "2", unit: "tbsp", price: 2.99 },
  //     { id: "butter-8", name: "Honey", quantity: "2", unit: "tbsp", price: 4.99 },
  //   ],
  //   steps: [
  //     "Marinate chicken with yogurt, ginger-garlic paste, and spices for 2 hours.",
  //     "Grill or pan-fry chicken until charred and cooked through. Set aside.",
  //     "Melt butter in a pan. Add ginger-garlic paste and sauté until fragrant.",
  //     "Add tomato puree and all spices. Simmer for 15 minutes.",
  //     "Stir in cream and honey. Adjust salt to taste.",
  //     "Add cooked chicken pieces. Simmer for 10 minutes.",
  //     "Finish with a swirl of cream and fresh cilantro. Serve with naan or rice."
  //   ]
  // },
  // {
  //   id: "margherita-pizza",
  //   name: "Margherita Pizza",
  //   description: "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, basil, and a perfectly charred crust.",
  //   image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=600&fit=crop",
  //   category: "Italian",
  //   prepTime: "2 hours",
  //   cookTime: "15 mins",
  //   servings: 2,
  //   rating: 4.7,
  //   featured: false,
  //   ingredients: [
  //     { id: "pizza-1", name: "Pizza Dough", quantity: "400", unit: "g", price: 3.99 },
  //     { id: "pizza-2", name: "San Marzano Tomatoes", quantity: "400", unit: "g", price: 4.99 },
  //     { id: "pizza-3", name: "Fresh Mozzarella", quantity: "200", unit: "g", price: 6.99 },
  //     { id: "pizza-4", name: "Fresh Basil", quantity: "1", unit: "bunch", price: 2.49 },
  //     { id: "pizza-5", name: "Olive Oil", quantity: "3", unit: "tbsp", price: 3.99 },
  //     { id: "pizza-6", name: "Garlic", quantity: "2", unit: "cloves", price: 0.49 },
  //   ],
  //   steps: [
  //     "Let pizza dough come to room temperature for 2 hours.",
  //     "Preheat oven to highest setting (500°F/260°C) with pizza stone.",
  //     "Crush San Marzano tomatoes by hand with garlic, olive oil, and salt.",
  //     "Stretch dough into a 12-inch circle. Don't overwork it.",
  //     "Spread tomato sauce, leaving a 1-inch border.",
  //     "Tear mozzarella and distribute evenly.",
  //     "Bake for 8-12 minutes until crust is charred and cheese is bubbly.",
  //     "Top with fresh basil leaves and a drizzle of olive oil. Serve immediately."
  //   ]
  // },
  // {
  //   id: "grilled-salmon",
  //   name: "Grilled Salmon",
  //   description: "Perfectly grilled Atlantic salmon with a lemon herb butter glaze. Healthy, delicious, and ready in minutes.",
  //   image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=600&fit=crop",
  //   category: "Seafood",
  //   prepTime: "10 mins",
  //   cookTime: "12 mins",
  //   servings: 2,
  //   rating: 4.6,
  //   featured: false,
  //   ingredients: [
  //     { id: "salmon-1", name: "Salmon Fillets", quantity: "2", unit: "pieces", price: 14.99 },
  //     { id: "salmon-2", name: "Lemon", quantity: "2", unit: "pieces", price: 1.49 },
  //     { id: "salmon-3", name: "Butter", quantity: "4", unit: "tbsp", price: 2.99 },
  //     { id: "salmon-4", name: "Fresh Dill", quantity: "1", unit: "bunch", price: 2.49 },
  //     { id: "salmon-5", name: "Garlic", quantity: "3", unit: "cloves", price: 0.69 },
  //     { id: "salmon-6", name: "Olive Oil", quantity: "2", unit: "tbsp", price: 1.99 },
  //   ],
  //   steps: [
  //     "Pat salmon fillets dry and let sit at room temperature for 15 minutes.",
  //     "Season both sides with salt, pepper, and a drizzle of olive oil.",
  //     "Heat grill or grill pan to medium-high heat.",
  //     "Grill salmon skin-side down for 4 minutes. Flip and cook 3-4 more minutes.",
  //     "Melt butter with minced garlic, lemon juice, and chopped dill.",
  //     "Spoon herb butter over salmon. Garnish with lemon slices and fresh dill."
  //   ]
  // },
  // {
  //   id: "beef-tacos",
  //   name: "Beef Tacos",
  //   description: "Authentic Mexican street tacos with seasoned ground beef, fresh salsa, guacamole, and warm corn tortillas.",
  //   image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=600&fit=crop",
  //   category: "Mexican",
  //   prepTime: "15 mins",
  //   cookTime: "20 mins",
  //   servings: 4,
  //   rating: 4.7,
  //   featured: false,
  //   ingredients: [
  //     { id: "tacos-1", name: "Ground Beef", quantity: "500", unit: "g", price: 8.99 },
  //     { id: "tacos-2", name: "Corn Tortillas", quantity: "12", unit: "pieces", price: 3.99 },
  //     { id: "tacos-3", name: "Onion", quantity: "1", unit: "large", price: 0.99 },
  //     { id: "tacos-4", name: "Fresh Cilantro", quantity: "1", unit: "bunch", price: 1.49 },
  //     { id: "tacos-5", name: "Lime", quantity: "3", unit: "pieces", price: 1.29 },
  //     { id: "tacos-6", name: "Avocados", quantity: "2", unit: "pieces", price: 3.99 },
  //     { id: "tacos-7", name: "Tomatoes", quantity: "3", unit: "medium", price: 2.99 },
  //     { id: "tacos-8", name: "Taco Seasoning", quantity: "2", unit: "tbsp", price: 2.49 },
  //   ],
  //   steps: [
  //     "Brown ground beef in a skillet. Drain excess fat.",
  //     "Add taco seasoning and water. Simmer until thickened.",
  //     "Dice tomatoes and onion. Mix with cilantro and lime juice for salsa.",
  //     "Mash avocados with lime juice, salt, and diced onion for guacamole.",
  //     "Warm tortillas on a dry skillet or over open flame.",
  //     "Assemble tacos with beef, salsa, guacamole, and extra cilantro."
  //   ]
  // }
];

export const reviews = [
  {
    id: "review-1",
    customerName: "Sarah Mitchell",
    customerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    comment: "The ingredients are always fresh and the recipes are so easy to follow. GustoKart has made home cooking a joy!"
  },
  {
    id: "review-2",
    customerName: "James Chen",
    customerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Best food delivery service I've used. The quality is restaurant-grade and delivery is always on time."
  },
  {
    id: "review-3",
    customerName: "Emily Rodriguez",
    customerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4,
    comment: "Love the variety of recipes available. From Indian to Italian, everything tastes authentic and delicious."
  },
  {
    id: "review-4",
    customerName: "Michael Thompson",
    customerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    comment: "The BBQ ribs recipe was incredible! My family couldn't believe I made it myself. Thank you GustoKart!"
  }
];

export const chefs = [
  {
    id: "chef-1",
    name: "Chef Ahmad Khan",
    specialty: "South Asian Cuisine",
    bio: "With 20 years of experience in traditional Pakistani and Indian cooking, Chef Ahmad brings authentic flavors from the subcontinent to your kitchen.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop"
  },
  {
    id: "chef-2",
    name: "Chef Maria Romano",
    specialty: "Italian Cuisine",
    bio: "Born and raised in Naples, Chef Maria mastered the art of Italian cooking from her grandmother. Her pasta dishes are legendary.",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop"
  },
  {
    id: "chef-3",
    name: "Chef David Williams",
    specialty: "BBQ & Grilling",
    bio: "A Texas pitmaster with championship credentials, Chef David knows the secrets to perfect smoked and grilled meats.",
    image: "https://images.unsplash.com/photo-1583394293214-28ez1c4f1c77?w=400&h=400&fit=crop"
  }
];

export function getRecipeById(id: string): RecipeData | undefined {
  return recipes.find(r => r.id === id);
}

export function getFeaturedRecipes(): RecipeData[] {
  return recipes.filter(r => r.featured);
}

export function searchRecipes(query: string): RecipeData[] {
  const lowerQuery = query.toLowerCase();
  return recipes.filter(r => 
    r.name.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.category.toLowerCase().includes(lowerQuery)
  );
}

export function getRecipesByCategory(category: string): RecipeData[] {
  return recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
}

export function getAllCategories(): string[] {
  return [...new Set(recipes.map(r => r.category))];
}
