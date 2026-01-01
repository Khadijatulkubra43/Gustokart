import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Users, 
  Clock, 
  Flame, 
  Star, 
  ChevronRight, 
  CreditCard, 
  Home, 
  MapPin, 
  Phone, 
  ShoppingBag 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Address, 3: Payment
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const deliveryFee = items.length > 0 ? 5.00 : 0;
  const isFreeDelivery = cartTotal >= 50;
  const finalTotal = cartTotal > 0 ? cartTotal + (isFreeDelivery ? 0 : deliveryFee) : 0;

  const totalServings = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleCheckout = () => {
    setShowCheckoutForm(true);
    setCheckoutStep(2);
  };

  const handlePlaceOrder = () => {
    // Here you would typically send order to backend
    alert(`Order placed successfully! Total: $${finalTotal.toFixed(2)}\n\nThank you for your order!`);
    clearCart();
    setLocation("/");
  };

  // Check if cart is empty
  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Add delicious meals to get started!</p>
          <Button 
            onClick={() => setLocation("/")} 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white px-8"
          >
            <Home className="w-4 h-4 mr-2" />
            Browse Menu
          </Button>
        </motion.div>
      </div>
    );
  }

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-12"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-32 h-32 bg-gray-200 rounded-xl"></div>
                      <div className="flex-grow">
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header with Steps */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Your Order</h1>
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500">
              {totalServings} total serving{totalServings > 1 ? 's' : ''} • {items.length} item{items.length > 1 ? 's' : ''}
            </p>
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="hidden md:flex"
            >
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          {/* Checkout Steps */}
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-12 relative">
            {/* Step 1: Cart */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${checkoutStep >= 1 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className={`text-sm font-medium ${checkoutStep >= 1 ? 'text-accent' : 'text-gray-500'}`}>
                Cart
              </span>
            </div>

            {/* Connector */}
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

            {/* Step 2: Address */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${checkoutStep >= 2 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className={`text-sm font-medium ${checkoutStep >= 2 ? 'text-accent' : 'text-gray-500'}`}>
                Details
              </span>
            </div>

            {/* Connector */}
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

            {/* Step 3: Payment */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${checkoutStep >= 3 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className={`text-sm font-medium ${checkoutStep >= 3 ? 'text-accent' : 'text-gray-500'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items or Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {!showCheckoutForm ? (
              /* Cart Items */
              <AnimatePresence>
                {items.map((item) => {
                  const itemPrice = item.recipe?.price || 0;
                  const extrasTotal = (item.selectedIngredients || []).reduce((sum, i) => sum + (i.price || 0), 0);
                  const basePrice = itemPrice + extrasTotal;
                  const itemTotal = basePrice * (item.quantity || 1);
                  
                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
                    >
                      <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.recipe?.image || "/placeholder-food.jpg"} 
                          alt={item.recipe?.name || "Food item"} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold text-primary">{item.recipe?.name || "Item"}</h3>
                              <span className="flex items-center gap-1 text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">
                                <Users className="w-3 h-3" />
                                {item.quantity || 1} serving{(item.quantity || 1) > 1 ? 's' : ''}
                              </span>
                            </div>
                            
                            {item.recipe && (
                              <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                                {item.recipe.time && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {item.recipe.time}
                                  </span>
                                )}
                                {item.recipe.calories && (
                                  <span className="flex items-center gap-1">
                                    <Flame className="w-3 h-3" /> {item.recipe.calories}
                                  </span>
                                )}
                                {item.recipe.rating && (
                                  <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-accent" /> {item.recipe.rating}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Item Total</div>
                            <div className="font-bold text-2xl text-accent">
                              ${itemTotal.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Selected ingredients */}
                        {item.selectedIngredients && item.selectedIngredients.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Added Extras:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.selectedIngredients.map((ing, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-secondary/30 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2"
                                >
                                  {ing.name}
                                  <span className="text-xs font-bold text-primary">
                                    +${((ing.price || 0) * (item.quantity || 1)).toFixed(2)}
                                  </span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Price breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium mb-1">Base Price:</div>
                            <div className="font-mono">${itemPrice.toFixed(2)} × {item.quantity || 1}</div>
                          </div>
                          
                          {item.selectedIngredients && item.selectedIngredients.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="font-medium mb-1">Extras Total:</div>
                              <div className="font-mono">
                                ${extrasTotal.toFixed(2)} × {item.quantity || 1}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-white rounded-md transition-colors disabled:opacity-30"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-bold text-primary">{item.quantity || 1}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-white rounded-md transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-sm text-gray-500">
                              {item.quantity || 1} serving{(item.quantity || 1) > 1 ? 's' : ''}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-5 h-5" />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            ) : (
              /* Checkout Form */
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-border"
              >
                {/* Address Form - Step 2 */}
                {checkoutStep === 2 && (
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Delivery Details
                    </h3>
                    
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                        <textarea
                          rows={3}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="Enter full address with apartment number"
                        />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCheckoutForm(false)}
                          className="flex-1"
                        >
                          Back to Cart
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setCheckoutStep(3)}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          Continue to Payment
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Payment Form - Step 3 */}
                {checkoutStep === 3 && (
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </h3>
                    
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Month</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            placeholder="MM"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Year</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            placeholder="YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCheckoutStep(2)}
                            className="flex-1"
                          >
                            Back to Details
                          </Button>
                          <Button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Place Order & Pay
                            <CreditCard className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-border sticky top-28"
              >
                <h3 className="text-xl font-serif font-bold text-primary mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {/* Order Items Summary */}
                  <div className="max-h-64 overflow-y-auto pr-2">
                    {items.map(item => {
                      const itemPrice = item.recipe?.price || 0;
                      const extrasTotal = (item.selectedIngredients || []).reduce((sum, i) => sum + (i.price || 0), 0);
                      const itemTotal = (itemPrice + extrasTotal) * (item.quantity || 1);
                      
                      return (
                        <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-2 pb-2 border-b border-gray-100">
                          <div className="flex-1">
                            <div className="font-medium">{item.recipe?.name || "Item"}</div>
                            <div className="text-xs text-gray-500">
                              {item.quantity || 1} × ${itemPrice.toFixed(2)}
                              {item.selectedIngredients && item.selectedIngredients.length > 0 && ` + $${extrasTotal.toFixed(2)} extras`}
                            </div>
                          </div>
                          <div className="font-medium">
                            ${itemTotal.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Subtotal */}
                  <div className="flex justify-between text-gray-600 pt-4 border-t border-gray-200">
                    <span>Subtotal ({totalServings} servings)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Delivery Fee */}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    {isFreeDelivery ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span>${deliveryFee.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {/* Delivery Discount */}
                  {isFreeDelivery && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="flex justify-between text-green-700 font-medium">
                        <span>Delivery Discount</span>
                        <span>-${deliveryFee.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">Free delivery for orders over $50!</p>
                    </div>
                  )}
                  
                  {/* Progress bar for free delivery */}
                  {!isFreeDelivery && cartTotal > 0 && cartTotal < 50 && (
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">${cartTotal.toFixed(2)} of $50</span>
                        <span className="text-accent font-medium">
                          ${(50 - cartTotal).toFixed(2)} more
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((cartTotal / 50) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-center text-gray-500 mt-1">
                        Add ${(50 - cartTotal).toFixed(2)} more for free delivery!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t border-dashed border-gray-300 my-6" />
                  
                  {/* Total */}
                  <div className="flex justify-between text-xl font-bold text-primary">
                    <span>Total Amount</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {!showCheckoutForm ? (
                  <>
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl mb-4"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <Button 
                      onClick={() => setLocation("/")}
                      variant="outline"
                      className="w-full border-2 h-12 rounded-xl mb-4"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                    
                    <Button 
                      onClick={clearCart}
                      variant="ghost"
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 h-12"
                    >
                      Clear Entire Cart
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => {
                      setShowCheckoutForm(false);
                      setCheckoutStep(1);
                    }}
                    variant="outline"
                    className="w-full border-2 h-12 rounded-xl"
                  >
                    Back to Cart Items
                  </Button>
                )}
                
                {/* Benefits */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Free delivery on orders over $50</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>30-minute delivery guarantee</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }