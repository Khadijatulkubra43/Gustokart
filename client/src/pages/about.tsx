import { motion } from "framer-motion";
import { chefs } from "@/lib/data";
import { CheckCircle, Leaf, Truck, Shield, Heart, Target, Users, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">Our Story</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            GustoKart began with a simple mission: to bring authentic, high-quality flavors to your dining table. 
            We believe that food is not just sustenance, but an emotion.
          </p>
        </motion.div>

        {/* About GustoKart Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Fresh ingredients delivery" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">About GustoKart</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  GustoKart is a modern online platform dedicated to delivering fresh, high-quality recipe ingredients straight to your doorstep. We simplify cooking by providing carefully selected ingredients so you can focus on what matters most—creating delicious meals with confidence.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to make cooking easy, enjoyable, and accessible for everyone by offering premium recipe ingredients that are fresh, authentic, and reliable.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become a trusted household name for recipe ingredients, empowering home cooks and food lovers to prepare restaurant-quality meals at home.
                </p>
              </div>
            </div>
          </motion.div>

          {/* What We Do & Values */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 rounded-xl overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Fresh vegetables and ingredients" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-secondary/10 p-8 rounded-2xl">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">What We Do</h3>
                <ul className="space-y-4">
                  {[
                    "Supplying fresh and authentic recipe ingredients",
                    "Offering ingredients for local, continental, and international recipes",
                    "Ensuring quality, hygiene, and freshness in every order"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <h4 className="text-xl font-serif font-bold text-primary mb-4">Our Ingredient Promise</h4>
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Quality check of ingredients" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-600 mb-4">
                  We believe great food starts with great ingredients. Every product at GustoKart is:
                </p>
                <ul className="space-y-3">
                  {[
                    "Handpicked from trusted suppliers",
                    "Stored under proper conditions",
                    "Checked for freshness and quality"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 rounded-xl overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1556909172-8897b6c9419b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team values and culture" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-secondary/10 p-8 rounded-2xl">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">Our Values</h3>
                <div className="space-y-6">
                  {[
                    { title: "Quality First", desc: "No compromise on freshness", icon: <Leaf className="w-5 h-5" /> },
                    { title: "Customer Satisfaction", desc: "Your happiness is our priority", icon: <Heart className="w-5 h-5" /> },
                    { title: "Transparency", desc: "Clear sourcing and honest pricing", icon: <Shield className="w-5 h-5" /> },
                    { title: "Passion for Food", desc: "We love ingredients as much as you do", icon: "👨‍🍳" }
                  ].map((value, index) => (
                    <div key={index} className="flex items-start border-l-4 border-accent pl-4">
                      <div className="mr-4 mt-1 text-primary">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-lg">{value.title}</h4>
                        <p className="text-gray-600">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-xl font-serif font-bold text-primary mb-4">Who We Serve</h4>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1556906781-2a9167546b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Diverse customers enjoying cooking" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {["Home cooks", "Food enthusiasts", "Busy families", "Beginners learning to cook", "Anyone who loves good food"].map((item, index) => (
                      <span key={index} className="bg-white border border-border px-4 py-2 rounded-full text-gray-600 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why Choose GustoKart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">Why Choose GustoKart</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">Experience the difference with our premium ingredient delivery service</p>
            </div>
            
            <div className="relative h-64 rounded-2xl overflow-hidden mb-12">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Premium ingredient delivery" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h4 className="text-2xl font-bold mb-2">Freshness Delivered to Your Doorstep</h4>
                  <p className="text-gray-200">Every ingredient is carefully selected and delivered at peak freshness</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Fresh & Quality-Assured", icon: <Leaf className="w-8 h-8" />, color: "text-green-600" },
                { title: "Carefully Curated", icon: "👨‍🍳", color: "text-orange-600" },
                { title: "Easy Ordering", icon: "🛒", color: "text-blue-600" },
                { title: "Fast Delivery", icon: <Truck className="w-8 h-8" />, color: "text-red-600" },
                { title: "Affordable", icon: "💰", color: "text-yellow-600" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-border text-center hover:shadow-xl transition-shadow">
                  <div className={`${item.color} mb-4 flex justify-center text-3xl`}>
                    {item.icon}
                  </div>
                  <p className="font-semibold text-primary">{item.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Original Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-primary/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Restaurant Interior" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">A Tradition of Excellence</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2010, GustoKart started as a small family kitchen. Today, we are proud to serve thousands of happy customers with the same love and dedication.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              GustoKart was created to solve a simple problem—finding the right ingredients for the right recipe. We noticed that many cooks struggle to find fresh and authentic items, so we built a platform that brings everything together in one place.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-secondary/30 p-6 rounded-xl">
                <h4 className="font-bold text-primary text-2xl mb-1">15+</h4>
                <p className="text-sm text-gray-600">Years of Service</p>
              </div>
              <div className="bg-secondary/30 p-6 rounded-xl">
                <h4 className="font-bold text-primary text-2xl mb-1">50k+</h4>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Fresh ingredients delivery process" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chefs Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-primary text-center mb-12">Meet Our Chefs</h2>
          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {chefs.map((chef) => (
              <motion.div 
                key={chef.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-border"
              >
                <div className="h-80 overflow-hidden">
                  <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary">{chef.name}</h3>
                  <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">{chef.role}</p>
                  <p className="text-gray-500 text-sm italic">{chef.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who We Serve - Detailed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-serif font-bold text-primary text-center mb-12">Our Community</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Home Cooks",
                image: "https://images.unsplash.com/photo-1556906781-2a9167546b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                desc: "Perfect for everyday cooking"
              },
              {
                title: "Food Enthusiasts",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                desc: "Explore new cuisines"
              },
              {
                title: "Busy Families",
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                desc: "Quick, healthy meals"
              },
              {
                title: "Beginners",
                image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                desc: "Learn with premium ingredients"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-border">
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-primary text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Join Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16 px-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Join our community background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Join the GustoKart Community</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Become part of the GustoKart family and enjoy stress-free cooking with premium ingredients delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors">
                Start Cooking with GustoKart
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Browse Recipes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}