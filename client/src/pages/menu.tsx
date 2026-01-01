import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useRouter } from 'wouter';
import { Star, Clock, Flame, ArrowRight, ChevronLeft } from 'lucide-react';

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

export default function MenuPage({ recipes }) {
  const router = useRouter();

  // Add a check to prevent errors if recipes is undefined
  if (!recipes || recipes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">No recipes found</h2>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mx-auto"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header with back button */}
        <div className="mb-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Our Full Menu
          </h1>
          <p className="text-gray-600 text-lg">
            Explore all {recipes.length} delicious recipes
          </p>
        </div>

        {/* All Recipes Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={item}>
              <Link href={`/recipe/${recipe.id}`}>
                <a className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-border/50 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      {recipe.rating}
                    </div>
                    {recipe.isPopular && (
                      <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">
                        {recipe.category}
                      </span>
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {recipe.time}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {recipe.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {recipe.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold text-primary">
                        ${recipe.price}
                      </span>
                      <span className="text-sm font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Order Now <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}