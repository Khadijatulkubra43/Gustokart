# GustoKart Design Guidelines

## Color Palette
- **Primary Color**: #202d10 (Dark Green) - Use for headers, navigation, primary buttons, and key UI elements
- **Accent Color**: #c04000 (Burnt Orange) - Use for CTAs, hover states, active elements, and highlights
- **Supporting**: White and light neutrals for backgrounds and text contrast

## Typography & Visual Style
- Modern, clean typography with strong hierarchy
- Rounded cards with soft shadows throughout
- Food photography emphasis - high-quality, appetizing imagery
- Smooth transitions and micro-interactions on all interactive elements
- Light animations: fade-ins, slides, and scale effects

## Layout System
- Use Tailwind spacing: Primarily p-4, p-6, p-8, m-4, m-6 for consistent rhythm
- Mobile-first responsive design
- Maximum content width: max-w-7xl for main containers
- Card-based layouts with rounded corners (rounded-lg, rounded-xl)

## Navigation Bar
- Sticky navigation throughout site
- Left: GustoKart logo with dark green background
- Center: Home, About, Contact links with hover effects
- Right: Cart icon (with dynamic item count badge) and User icon
- Smooth shadow on scroll
- Mobile: Hamburger menu with slide-in drawer

## Page-Specific Design

### Landing Page
- **Hero Section**: Full-width with large, appetizing food photography background, overlay gradient (dark green with opacity), bold headline center-aligned, primary CTA button with burnt orange background
- **Recipe Showcase**: Grid layout (3-4 columns desktop, 2 tablet, 1 mobile), recipe cards with image, title, brief description, hover lift effect
- **Featured Dishes Slider**: Auto-rotating carousel with navigation dots
- **Customer Reviews**: Card-based testimonials with star ratings, customer photos
- **Newsletter Signup**: Centered section with email input and subscribe button

### Recipe Detail Page
- Large hero image of the dish
- Recipe title and description
- Two-column layout (desktop): Left - recipe steps numbered list, Right - ingredients with individual checkboxes
- Ingredient checkboxes: Custom-styled with burnt orange when selected
- Sticky "Add to Cart" button (burnt orange) that follows scroll
- Mobile: Single column with ingredients section first

### Cart Page
- Product cards showing: ingredient image thumbnail, name, quantity controls (+/- buttons), remove icon
- Right sidebar (desktop) / bottom section (mobile): Order summary with subtotal, delivery fee, total
- "Proceed to Checkout" button - prominent burnt orange
- Empty cart state with illustration and "Browse Recipes" CTA

### Checkout Page
- Two-column: Left - customer form (name, phone, address, delivery instructions, payment method radio buttons), Right - order summary (sticky)
- Form styling: Dark green labels, clean input fields with focus states
- "Confirm Order" button with success animation (checkmark animation overlay)

### Login/Signup Page
- Centered card design with max-width
- Tab switching between Sign In / Sign Up
- Form fields: Email, Password, Name (signup only)
- Social login options with icons
- "Continue as Guest" link at bottom
- Background: Subtle food pattern or gradient

### About Page
- Hero section with restaurant story and mission statement
- Multi-column feature cards: Fresh ingredients, Cooking quality, Hotel background
- Chef introduction cards (3-4): Photo, name, specialty, bio with stagger animation on scroll
- Values/guarantee section with icons

### Contact Page
- Two-column layout: Left - contact form (name, email, message), Right - contact information
- WhatsApp floating button (burnt orange, bottom-right corner)
- Google Maps embed (full-width section)
- Working hours table
- Phone, email, address with icons

## Components

### Buttons
- Primary: Burnt orange background, white text, rounded-lg, shadow on hover
- Secondary: Dark green outline, transparent background
- Ghost: No background, dark green text
- All buttons: Smooth hover scale and shadow effects

### Cards
- White background, rounded-xl, subtle shadow
- Hover: Lift effect (translateY + shadow increase)
- Padding: p-6 for content

### Forms
- Input fields: Border with dark green focus state, rounded-lg, p-3
- Labels: Dark green, font-medium, mb-2
- Error states: Burnt orange border and text

### Icons
- Use Heroicons via CDN
- Cart badge: Burnt orange circle with white number
- Social icons in footer: Hover color transition to burnt orange

## Images
- **Hero Image**: Large, appetizing food spread or signature dish (1920x1080 minimum)
- **Recipe Cards**: Individual dish photos (square format, 600x600)
- **Chef Photos**: Professional headshots (400x400)
- **Background Patterns**: Subtle food-related textures for sections
- Buttons on images: Blurred background (backdrop-blur), no custom hover states

## Animations
- Page transitions: Fade-in on load
- Scroll animations: Elements fade and slide up when entering viewport
- Hover effects: Scale (1.05), shadow increase
- Cart updates: Number badge pulse animation
- Success states: Checkmark with scale animation
- Keep animations subtle and performant

## Footer
- Dark green background (#202d10)
- Multi-column: Logo & description, Quick links, Contact info, Social icons
- Social icons: White with burnt orange hover
- Bottom bar: Copyright, Privacy Policy, Terms links
- Newsletter signup integrated

## Search Bar
- Prominent placement below hero
- Dark green border with burnt orange focus state
- Search icon (Heroicons)
- Autocomplete dropdown with recipe suggestions

## Mobile Responsiveness
- Stack columns to single column
- Larger touch targets (min 44x44px)
- Simplified navigation (hamburger menu)
- Bottom navigation for cart/profile on mobile
- Optimized image sizes for faster loading