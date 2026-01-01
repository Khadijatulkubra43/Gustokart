import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Clock, 
  Flame, 
  Star, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { recipes } from "@/lib/data";
import { Button } from "@/components/ui/button";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Recipes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play carousel for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recipes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-widest">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mt-2">
            Signature Dishes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Experience all 5 of our chef's special creations. Each dish tells a unique story!
          </p>
        </div>

        {/* Desktop Grid View (5 recipes) */}
        <div className="hidden lg:block">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {recipes.map((recipe) => (
              <motion.div key={recipe.id} variants={item} className="h-full">
                <Link href={`/recipe/${recipe.id}`}>
                  <div className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-border/50 hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        {recipe.rating}
                      </div>
                      <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Special
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-accent uppercase tracking-wider">
                          {recipe.category}
                        </span>
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {recipe.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-1">
                        {recipe.name}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-lg font-bold text-primary">
                          ${recipe.price}
                        </span>
                        <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="overflow-hidden rounded-2xl"
            >
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <Link href={`/recipe/${recipe.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-border/50">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            {recipe.rating}
                          </div>
                          <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            Special
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-bold text-accent uppercase tracking-wider">
                              {recipe.category}
                            </span>
                            <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {recipe.time}
                            </span>
                          </div>
                          <h3 className="text-xl font-serif font-bold text-primary mb-3">
                            {recipe.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {recipe.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">
                              ${recipe.price}
                            </span>
                            <span className="text-sm font-bold text-accent flex items-center gap-1">
                              Order Now <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg w-10 h-10 rounded-full z-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg w-10 h-10 rounded-full z-10"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {recipes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-accent w-6" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/menu">
            <Button variant="outline" className="rounded-full px-8 h-12">
              View Full Menu
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}