import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users, type User, type InsertUser,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  contactMessages, type ContactMessage, type InsertContactMessage,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription,
  reviews, type Review, type InsertReview,
  savedRecipes, type SavedRecipe, type InsertSavedRecipe,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  // Order Items
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  // Newsletter
  createNewsletterSubscription(sub: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  
  // Reviews
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByRecipeId(recipeId: string): Promise<Review[]>;
  getAllReviews(): Promise<Review[]>;
  
  // Saved Recipes
  createSavedRecipe(saved: InsertSavedRecipe): Promise<SavedRecipe>;
  getSavedRecipesByUserId(userId: string): Promise<SavedRecipe[]>;
  deleteSavedRecipe(userId: string, recipeId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.userId, userId));
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return db.select().from(orders);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return order;
  }

  // Order Items
  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db.insert(orderItems).values(item).returning();
    return orderItem;
  }

  async getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db.insert(contactMessages).values(message).returning();
    return contactMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages);
  }

  // Newsletter
  async createNewsletterSubscription(sub: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [subscription] = await db.insert(newsletterSubscriptions).values(sub).returning();
    return subscription;
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    const [sub] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return sub;
  }

  // Reviews
  async createReview(review: InsertReview): Promise<Review> {
    const [createdReview] = await db.insert(reviews).values(review).returning();
    return createdReview;
  }

  async getReviewsByRecipeId(recipeId: string): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.recipeId, recipeId));
  }

  async getAllReviews(): Promise<Review[]> {
    return db.select().from(reviews);
  }

  // Saved Recipes
  async createSavedRecipe(saved: InsertSavedRecipe): Promise<SavedRecipe> {
    const [savedRecipe] = await db.insert(savedRecipes).values(saved).returning();
    return savedRecipe;
  }

  async getSavedRecipesByUserId(userId: string): Promise<SavedRecipe[]> {
    return db.select().from(savedRecipes).where(eq(savedRecipes.userId, userId));
  }

  async deleteSavedRecipe(userId: string, recipeId: string): Promise<void> {
    await db.delete(savedRecipes)
      .where(eq(savedRecipes.userId, userId))
      .where(eq(savedRecipes.recipeId, recipeId));
  }
}

export const storage = new DatabaseStorage();
