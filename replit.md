# GustoKart - Recipe Ingredient Delivery Platform

## Overview

GustoKart is a recipe-based ingredient delivery platform that allows users to browse recipes, select ingredients, and order them for delivery. The application combines recipe discovery with e-commerce functionality, enabling customers to shop for ingredients organized by recipes rather than individual products.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query for server state management and data fetching

**UI Component Library**
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design system
- Framer Motion for animations and transitions
- Custom theme system supporting light/dark modes

**Design System**
- Primary color: #202d10 (Dark Green) for headers and navigation
- Accent color: #c04000 (Burnt Orange) for CTAs and interactive elements
- Card-based layouts with rounded corners and soft shadows
- Mobile-first responsive design with maximum content width of 1280px
- Custom fonts: Poppins (sans-serif) and Playfair Display (serif)

**State Management Pattern**
- React Context API for global state (auth, cart, theme)
- Local storage persistence for cart and theme preferences
- Session-based authentication with cookies
- Guest checkout functionality supported

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across backend
- Session management with express-session (using memory store or connect-pg-simple)
- RESTful API design pattern

**API Structure**
- `/api/auth/*` - Authentication endpoints (register, login, logout, session check)
- `/api/orders/*` - Order management (create, retrieve, update status)
- `/api/saved-recipes/*` - User saved recipes
- `/api/newsletter` - Newsletter subscription handling
- `/api/contact` - Contact form submissions
- `/api/reviews/*` - Recipe reviews and ratings

**Authentication & Authorization**
- Password hashing with bcryptjs (10 salt rounds)
- Session-based authentication with HTTP-only cookies
- Role-based access control (user vs admin roles)
- Guest mode supported for browsing without account

### Data Storage

**Database**
- PostgreSQL as the primary relational database
- Drizzle ORM for type-safe database queries and schema management
- Database schema includes:
  - Users (id, email, password, name, role, createdAt)
  - Recipes (id, name, description, image, category, prepTime, cookTime, servings, rating, featured)
  - Ingredients (id, recipeId, name, quantity, unit, price)
  - Orders (id, userId, status, totalAmount, deliveryAddress, timestamps)
  - OrderItems (id, orderId, ingredientId, quantity, price)
  - ContactMessages, NewsletterSubscriptions, Reviews, SavedRecipes

**Data Patterns**
- UUID primary keys using PostgreSQL gen_random_uuid()
- Zod schemas for runtime validation (drizzle-zod integration)
- Foreign key relationships between orders, items, and recipes
- Decimal type for pricing to maintain precision

**Client-Side Data**
- Recipe data currently stored in static TypeScript file (recipes-data.ts)
- Cart state persisted to localStorage
- User preferences (theme, guest mode) in localStorage

### External Dependencies

**UI Component Libraries**
- @radix-ui/* - 20+ headless UI components for accessibility
- framer-motion - Animation library for micro-interactions
- lucide-react - Icon library

**Form & Validation**
- react-hook-form - Form state management
- @hookform/resolvers - Form validation integration
- zod - Schema validation library
- zod-validation-error - Better error messages

**Database & ORM**
- drizzle-orm - TypeScript ORM
- drizzle-kit - Schema migrations
- pg - PostgreSQL client driver
- connect-pg-simple - PostgreSQL session store

**Authentication**
- bcryptjs - Password hashing
- express-session - Session middleware

**Development Tools**
- tsx - TypeScript execution for development
- esbuild - Production bundler for server code
- @replit/vite-plugin-* - Replit-specific development plugins

**CSS & Styling**
- tailwindcss - Utility-first CSS framework
- tailwind-merge - Merge Tailwind classes
- clsx - Conditional class names
- class-variance-authority - Component variant styling

**Date Handling**
- date-fns - Date utility library

**Routing & State**
- wouter - Minimal router (2kb alternative to React Router)
- @tanstack/react-query - Async state management