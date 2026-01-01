import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(10, "Full address is required"),
  instructions: z.string().optional(),
  payment: z.enum(["card", "cash"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      payment: "card"
    }
  });

  const onSubmit = (data: CheckoutFormValues) => {
    // Simulate API call
    console.log(data);
    setTimeout(() => {
      toast({
        title: "Order Confirmed!",
        description: "Your delicious food is on its way.",
      });
      clearCart();
      setLocation("/"); // Or redirect to success page
    }, 1500);
  };

  const deliveryFee = 5.00;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8 text-center">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-border"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Delivery Details</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...form.register("name")} className="bg-gray-50" />
                {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...form.register("phone")} className="bg-gray-50" />
                {form.formState.errors.phone && <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea id="address" {...form.register("address")} className="bg-gray-50 min-h-[100px]" />
                {form.formState.errors.address && <p className="text-red-500 text-xs">{form.formState.errors.address.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                <Input id="instructions" {...form.register("instructions")} className="bg-gray-50" placeholder="Gate code, leave at door, etc." />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <Label className="text-lg font-bold">Payment Method</Label>
                <RadioGroup 
                  defaultValue="card" 
                  onValueChange={(val) => form.setValue("payment", val as "card" | "cash")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent cursor-pointer transition-all"
                    >
                      <span className="mb-2 text-xl">💳</span>
                      Card Payment
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                    <Label
                      htmlFor="cash"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent cursor-pointer transition-all"
                    >
                      <span className="mb-2 text-xl">💵</span>
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg rounded-xl mt-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Processing..." : `Confirm Order - $${finalTotal.toFixed(2)}`}
              </Button>
            </form>
          </motion.div>

          {/* Summary Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-fit bg-primary text-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/20 my-4" />
              <div className="flex justify-between text-2xl font-bold text-accent">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="text-accent w-5 h-5" />
                <span className="font-bold">Secure Checkout</span>
              </div>
              <p className="text-sm text-gray-300">
                Your payment information is encrypted and secure. We do not store your card details.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
