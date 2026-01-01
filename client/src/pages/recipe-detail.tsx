import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { recipes, Ingredient } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Clock, Flame, Star, ShoppingBag, Users, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./not-found";

export default function RecipeDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  
  const recipe = recipes.find((r) => r.id === id);
  
  // State for selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  // State for quantity (number of people/servings)
  const [quantity, setQuantity] = useState(1);

  if (!recipe) return <NotFound />;

  const toggleIngredient = (ingredient: Ingredient) => {
    if (selectedIngredients.find(i => i.name === ingredient.name)) {
      setSelectedIngredients(prev => prev.filter(i => i.name !== ingredient.name));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Calculate base price per serving
  const basePricePerServing = recipe.price;
  
  // Calculate total price including extras multiplied by quantity
  const ingredientsTotal = selectedIngredients.reduce((sum, i) => sum + i.price, 0);
  const totalPrice = (basePricePerServing + ingredientsTotal) * quantity;

  const handleAddToCart = () => {
    // Correct call to addToCart with three separate arguments
    addToCart(recipe, selectedIngredients, quantity);
    
    // Optional: Show success message or redirect to cart
    // You can add a toast notification here
    console.log("Added to cart:", { recipe, selectedIngredients, quantity });
    
    // Optional: Redirect to cart page after adding
    // setLocation("/cart");
  };

  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-secondary/50"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-primary shadow-lg">
              {recipe.category}
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <Clock className="w-4 h-4" /> {recipe.time}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <Flame className="w-4 h-4" /> {recipe.calories}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-accent">
                <Star className="w-4 h-4 fill-accent" /> {recipe.rating}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              {recipe.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {recipe.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8 bg-gradient-to-r from-accent/10 to-secondary/10 p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-primary mb-4 font-serif flex items-center gap-2">
                <Users className="w-5 h-5" /> Select Number of Servings
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">How many people are eating?</p>
                  <p className="text-xs text-gray-500">Base price: ${basePricePerServing.toFixed(2)} per serving</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border-2"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{quantity}</div>
                    <div className="text-xs text-gray-500">serving{quantity > 1 ? 's' : ''}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-full border-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Quick quantity options */}
              <div className="mt-4 flex gap-2">
                {[1, 2, 4, 6, 8].map(num => (
                  <Button
                    key={num}
                    variant={quantity === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQuantity(num)}
                    className={`flex-1 ${quantity === num ? 'bg-accent hover:bg-accent/90' : ''}`}
                  >
                    {num} {num === 1 ? 'Person' : 'People'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Preparation Steps */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-4 font-serif">Preparation</h3>
              <ul className="space-y-2 list-disc pl-5 text-gray-600">
                {recipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            {/* Extras / Ingredients */}
            <div className="mb-8 bg-secondary/20 p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-primary mb-4 font-serif">Customize Your Order</h3>
              <p className="text-sm text-gray-600 mb-4">Extra ingredients will be added to each serving</p>
              <div className="space-y-3">
                {recipe.ingredients.map((ing) => {
                  const isSelected = !!selectedIngredients.find(i => i.name === ing.name);
                  const ingredientTotal = ing.price * quantity;
                  
                  return (
                    <div 
                      key={ing.name} 
                      className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer hover:border-accent/50 ${
                        isSelected ? 'bg-accent/10 border-accent' : 'bg-white border-transparent'
                      }`}
                      onClick={() => toggleIngredient(ing)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id={ing.name} 
                          checked={isSelected}
                          onCheckedChange={() => toggleIngredient(ing)}
                          className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                        />
                        <label
                          htmlFor={ing.name}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {ing.name}
                        </label>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-primary">
                          +${ing.price.toFixed(2)} × {quantity} = ${ingredientTotal.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500">per serving × {quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-auto pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price Breakdown</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Base ({quantity} servings):</span>
                      <span>${(basePricePerServing * quantity).toFixed(2)}</span>
                    </div>
                    {selectedIngredients.length > 0 && (
                      <div className="flex justify-between">
                        <span>Extras ({quantity} servings):</span>
                        <span>${(ingredientsTotal * quantity).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white h-14 rounded-xl text-lg min-w-[200px]"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" /> 
                  Add {quantity} {quantity > 1 ? 'Servings' : 'Serving'} to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}