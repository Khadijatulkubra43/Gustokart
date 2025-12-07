import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Clock, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { recipes, reviews, getFeaturedRecipes, searchRecipes } from "@/lib/recipes-data";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const featuredRecipes = getFeaturedRecipes();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setNewsletterEmail("");
    toast({
      title: "Subscribed!",
      description: "Thank you for joining our culinary community.",
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredRecipes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredRecipes.length) % featuredRecipes.length);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop"
            alt="Delicious food spread"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/80 to-accent/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">
                Fresh Ingredients Delivered Daily
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-accent-foreground leading-tight"
            >
              Discover the Art of <br />
              <span className="text-primary">Home Cooking</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-accent-foreground/80 max-w-2xl mx-auto"
            >
              From authentic Biryani to perfect Pasta, explore our curated collection 
              of recipes and get fresh ingredients delivered to your doorstep.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-explore-recipes"
              >
                Explore Recipes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-background/10 backdrop-blur-sm border-accent-foreground/30 text-accent-foreground hover:bg-background/20"
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-accent-foreground/50 rounded-full p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-accent-foreground/50 rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Featured Dishes
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Our chef-curated selection of the most popular and delicious recipes
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredRecipes.map((recipe) => (
                  <div key={recipe.id} className="w-full flex-shrink-0 px-4">
                    <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <Badge className="mb-3">{recipe.category}</Badge>
                        <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                          {recipe.name}
                        </h3>
                        <p className="text-white/80 mb-4 max-w-lg line-clamp-2">
                          {recipe.description}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1 text-white/80">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{recipe.cookTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/80">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{recipe.servings} servings</span>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm text-white">{recipe.rating}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => setLocation(`/recipe/${recipe.id}`)}
                          data-testid={`button-view-recipe-${recipe.id}`}
                        >
                          View Recipe
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <Button
              size="icon"
              variant="secondary"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
              data-testid="button-slider-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
              data-testid="button-slider-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            <div className="flex justify-center gap-2 mt-4">
              {featuredRecipes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-primary" : "bg-muted"
                  }`}
                  data-testid={`button-slider-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="recipes" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Our Recipes
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Browse our collection of authentic recipes from around the world
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recipes.map((recipe) => (
              <motion.div key={recipe.id} variants={fadeInUp}>
                <Link href={`/recipe/${recipe.id}`}>
                  <Card className="overflow-hidden cursor-pointer group h-full hover-elevate transition-transform duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="backdrop-blur-sm">
                          {recipe.category}
                        </Badge>
                      </div>
                      {recipe.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge>Featured</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3
                        className="font-semibold text-lg text-foreground mb-2 line-clamp-1"
                        data-testid={`text-recipe-name-${recipe.id}`}
                      >
                        {recipe.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {recipe.cookTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {recipe.servings}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {recipe.rating}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Join thousands of happy home cooks who trust GustoKart
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {reviews.map((review) => (
              <motion.div key={review.id} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={review.customerImage}
                        alt={review.customerName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{review.customerName}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      "{review.comment}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold text-accent-foreground mb-4"
            >
              Join Our Culinary Community
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-accent-foreground/80 mb-8"
            >
              Subscribe to receive exclusive recipes, cooking tips, and special offers.
            </motion.p>
            <motion.form
              variants={fadeInUp}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-background"
                data-testid="input-newsletter-hero"
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                data-testid="button-subscribe-hero"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
