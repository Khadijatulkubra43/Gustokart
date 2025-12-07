import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Users, Star, ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getRecipeById, type IngredientData } from "@/lib/recipes-data";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface SelectedIngredient extends IngredientData {
  quantity: number;
}

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = getRecipeById(id || "");
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [selectedIngredients, setSelectedIngredients] = useState<Map<string, SelectedIngredient>>(new Map());
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Recipe Not Found</h1>
          <Link href="/">
            <Button data-testid="button-back-home">Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleIngredient = (ingredient: IngredientData) => {
    setSelectedIngredients((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(ingredient.id)) {
        newMap.delete(ingredient.id);
      } else {
        newMap.set(ingredient.id, { ...ingredient, quantity: 1 });
      }
      return newMap;
    });
  };

  const updateIngredientQuantity = (ingredientId: string, delta: number) => {
    setSelectedIngredients((prev) => {
      const newMap = new Map(prev);
      const item = newMap.get(ingredientId);
      if (item) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          newMap.delete(ingredientId);
        } else {
          newMap.set(ingredientId, { ...item, quantity: newQty });
        }
      }
      return newMap;
    });
  };

  const selectAllIngredients = () => {
    const newMap = new Map<string, SelectedIngredient>();
    recipe.ingredients.forEach((ing) => {
      newMap.set(ing.id, { ...ing, quantity: 1 });
    });
    setSelectedIngredients(newMap);
  };

  const clearSelection = () => {
    setSelectedIngredients(new Map());
  };

  const calculateTotal = () => {
    let total = 0;
    selectedIngredients.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleAddToCart = () => {
    if (selectedIngredients.size === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient to add to cart.",
        variant: "destructive",
      });
      return;
    }

    selectedIngredients.forEach((item) => {
      addItem({
        ingredientId: item.id,
        ingredientName: item.name,
        quantity: item.quantity,
        price: item.price,
        recipeName: recipe.name,
      });
    });

    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 2000);

    toast({
      title: "Added to cart!",
      description: `${selectedIngredients.size} ingredient(s) added to your cart.`,
    });

    setSelectedIngredients(new Map());
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-20 left-4 sm:left-8">
          <Link href="/">
            <Button variant="secondary" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Recipes
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <Badge className="mb-4">{recipe.category}</Badge>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-recipe-title">
                  {recipe.name}
                </h1>
                <p className="text-muted-foreground text-lg mb-6">{recipe.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Prep Time</p>
                      <p className="font-medium text-foreground">{recipe.prepTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Cook Time</p>
                      <p className="font-medium text-foreground">{recipe.cookTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Servings</p>
                      <p className="font-medium text-foreground">{recipe.servings}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <div>
                      <p className="text-muted-foreground">Rating</p>
                      <p className="font-medium text-foreground">{recipe.rating}/5</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-foreground leading-relaxed pt-1" data-testid={`text-step-${index + 1}`}>
                        {step}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <CardTitle className="font-serif text-xl">Ingredients</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={selectAllIngredients}
                        data-testid="button-select-all"
                      >
                        Select All
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSelection}
                        data-testid="button-clear-selection"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-3">
                  {recipe.ingredients.map((ingredient) => {
                    const selected = selectedIngredients.get(ingredient.id);
                    const isSelected = !!selected;

                    return (
                      <motion.div
                        key={ingredient.id}
                        layout
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <Checkbox
                          id={ingredient.id}
                          checked={isSelected}
                          onCheckedChange={() => toggleIngredient(ingredient)}
                          data-testid={`checkbox-ingredient-${ingredient.id}`}
                        />
                        <label
                          htmlFor={ingredient.id}
                          className="flex-1 cursor-pointer"
                        >
                          <p className="text-sm font-medium text-foreground">
                            {ingredient.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ingredient.quantity} {ingredient.unit}
                          </p>
                        </label>
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-1"
                            >
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-6 h-6"
                                onClick={() => updateIngredientQuantity(ingredient.id, -1)}
                                data-testid={`button-decrease-${ingredient.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center text-sm font-medium">
                                {selected?.quantity || 0}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-6 h-6"
                                onClick={() => updateIngredientQuantity(ingredient.id, 1)}
                                data-testid={`button-increase-${ingredient.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          )}
                          <p className="text-sm font-semibold text-primary w-16 text-right">
                            ${(ingredient.price * (selected?.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}

                  <div className="pt-4 border-t border-border mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">
                        {selectedIngredients.size} item(s) selected
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>

                    <Button
                      className="w-full relative overflow-hidden"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={selectedIngredients.size === 0}
                      data-testid="button-add-to-cart"
                    >
                      <AnimatePresence mode="wait">
                        {showAddedAnimation ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            <Check className="w-5 h-5" />
                            Added to Cart!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
