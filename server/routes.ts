import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertOrderSchema, 
  insertContactMessageSchema, 
  insertNewsletterSubscriptionSchema,
  insertReviewSchema,
  insertUserSchema,
} from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validated = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(validated.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const hashedPassword = await bcrypt.hash(validated.password, 10);
      const user = await storage.createUser({
        ...validated,
        password: hashedPassword,
      });
      
      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  });

  // Orders
  app.post("/api/orders", async (req, res) => {
    try {
      const { items, ...orderData } = req.body;
      const validated = insertOrderSchema.parse(orderData);
      
      const order = await storage.createOrder({
        ...validated,
        userId: req.session.userId || null,
      });
      
      // Create order items
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.createOrderItem({
            orderId: order.id,
            ingredientName: item.ingredientName,
            quantity: item.quantity,
            price: item.price,
            recipeName: item.recipeName,
          });
        }
      }
      
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const orders = await storage.getOrdersByUserId(req.session.userId);
    res.json(orders);
  });

  app.get("/api/orders/:id", async (req, res) => {
    const order = await storage.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    const items = await storage.getOrderItemsByOrderId(order.id);
    res.json({ ...order, items });
  });

  // Admin: Get all orders
  app.get("/api/admin/orders", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    const orders = await storage.getAllOrders();
    res.json(orders);
  });

  app.patch("/api/admin/orders/:id/status", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    const { status } = req.body;
    const order = await storage.updateOrderStatus(req.params.id, status);
    res.json(order);
  });

  // Contact Messages
  app.post("/api/contact", async (req, res) => {
    try {
      const validated = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validated);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get("/api/admin/contact-messages", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    const messages = await storage.getAllContactMessages();
    res.json(messages);
  });

  // Newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validated = insertNewsletterSubscriptionSchema.parse(req.body);
      
      const existing = await storage.getNewsletterSubscriptionByEmail(validated.email);
      if (existing) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      
      const subscription = await storage.createNewsletterSubscription(validated);
      res.json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  // Reviews
  app.post("/api/reviews", async (req, res) => {
    try {
      const validated = insertReviewSchema.parse(req.body);
      
      const reviewData = {
        ...validated,
        userId: req.session.userId || null,
      };
      
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.get("/api/reviews/:recipeId", async (req, res) => {
    const reviews = await storage.getReviewsByRecipeId(req.params.recipeId);
    res.json(reviews);
  });

  // Saved Recipes
  app.post("/api/saved-recipes", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const { recipeId } = req.body;
      const saved = await storage.createSavedRecipe({
        userId: req.session.userId,
        recipeId,
      });
      res.json(saved);
    } catch (error) {
      res.status(500).json({ message: "Failed to save recipe" });
    }
  });

  app.get("/api/saved-recipes", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const saved = await storage.getSavedRecipesByUserId(req.session.userId);
    res.json(saved);
  });

  app.delete("/api/saved-recipes/:recipeId", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    await storage.deleteSavedRecipe(req.session.userId, req.params.recipeId);
    res.json({ message: "Recipe removed from saved" });
  });

  return httpServer;
}
