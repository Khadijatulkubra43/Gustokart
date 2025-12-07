import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Package, Heart, User, ArrowLeft, Clock, ChefHat, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { getRecipeById } from "@/lib/recipes-data";
import { motion } from "framer-motion";
import type { Order, SavedRecipe } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();

  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: !!user,
  });

  const { data: savedRecipes = [], isLoading: savedRecipesLoading } = useQuery<SavedRecipe[]>({
    queryKey: ["/api/saved-recipes"],
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-serif text-xl font-bold mb-2">Sign in Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to access your dashboard
            </p>
            <Link href="/login">
              <Button data-testid="button-go-to-login">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Welcome, {user.name}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders" data-testid="tab-orders">
                <Package className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="saved" data-testid="tab-saved-recipes">
                <Heart className="w-4 h-4 mr-2" />
                Saved Recipes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : orders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring recipes and place your first order
                    </p>
                    <Link href="/">
                      <Button data-testid="button-browse-recipes">Browse Recipes</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} data-testid={`order-card-${order.id}`}>
                      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(order.createdAt!).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status!)}>
                          {order.status}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress}
                            </p>
                          </div>
                          <p className="font-semibold text-lg">
                            ${(order.total / 100).toFixed(2)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-4">
              {savedRecipesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : savedRecipes.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No saved recipes</h3>
                    <p className="text-muted-foreground mb-4">
                      Save your favorite recipes to access them quickly
                    </p>
                    <Link href="/">
                      <Button data-testid="button-browse-recipes-saved">Explore Recipes</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {savedRecipes.map((saved) => {
                    const recipe = getRecipeById(saved.recipeId);
                    if (!recipe) return null;
                    
                    return (
                      <Link key={saved.id} href={`/recipe/${recipe.id}`}>
                        <Card 
                          className="overflow-hidden hover-elevate cursor-pointer"
                          data-testid={`saved-recipe-card-${saved.id}`}
                        >
                          <div className="flex gap-4">
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="w-24 h-24 object-cover"
                            />
                            <div className="flex-1 py-3 pr-3">
                              <h3 className="font-medium text-foreground mb-1">{recipe.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ChefHat className="w-3 h-3" />
                                <span>{recipe.category}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{recipe.cookTime}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
