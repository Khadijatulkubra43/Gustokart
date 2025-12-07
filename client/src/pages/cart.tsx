import { Link } from "wouter";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, removeItem, updateQuantity, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any ingredients yet. Browse our recipes and start building your cart!
            </p>
            <Link href="/">
              <Button size="lg" data-testid="button-browse-recipes">
                Browse Recipes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.recipeName]) {
      acc[item.recipeName] = [];
    }
    acc[item.recipeName].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Your Cart</h1>
                <p className="text-muted-foreground">
                  {items.length} item{items.length !== 1 ? "s" : ""} in your cart
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
              data-testid="button-clear-cart"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {Object.entries(groupedItems).map(([recipeName, recipeItems]) => (
                  <motion.div
                    key={recipeName}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-medium">
                          From: {recipeName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        {recipeItems.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                          >
                            <div className="flex-1">
                              <p
                                className="font-medium text-foreground"
                                data-testid={`text-cart-item-${item.id}`}
                              >
                                {item.ingredientName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="secondary"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                data-testid={`button-decrease-cart-${item.id}`}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span
                                className="w-8 text-center font-medium text-foreground"
                                data-testid={`text-quantity-${item.id}`}
                              >
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="secondary"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                data-testid={`button-increase-cart-${item.id}`}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <p className="font-semibold text-foreground w-20 text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>

                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground" data-testid="text-subtotal">
                        ${getSubtotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-medium text-foreground" data-testid="text-delivery-fee">
                        ${getDeliveryFee().toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-primary" data-testid="text-total">
                          ${getTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <Button className="w-full" size="lg" data-testid="button-checkout">
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>

                    <Link href="/">
                      <Button variant="ghost" className="w-full" data-testid="button-continue-shopping">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
