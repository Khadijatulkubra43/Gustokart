import { Award, Leaf, ChefHat, Heart, Clock, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { chefs } from "@/lib/recipes-data";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function About() {
  const features = [
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      description: "We source only the freshest, highest-quality ingredients from trusted local farms and suppliers.",
    },
    {
      icon: ChefHat,
      title: "Expert Chefs",
      description: "Our recipes are crafted by professional chefs with decades of culinary experience.",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Every ingredient is carefully inspected to meet our strict quality standards.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery ensures your ingredients arrive fresh and ready to cook.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description: "We believe cooking should be a joyful experience that brings people together.",
    },
    {
      icon: Clock,
      title: "Saving Your Time",
      description: "Skip the grocery store. Get pre-measured ingredients delivered to your door.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop"
            alt="Restaurant kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/85 to-accent/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-accent-foreground mb-6"
            >
              Bringing Restaurant Quality to Your Home
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-accent-foreground/80 leading-relaxed"
            >
              GustoKart was born from a simple idea: everyone deserves access to 
              restaurant-quality ingredients and recipes. We partner with local farms 
              and world-class chefs to bring you the finest culinary experience right 
              in your own kitchen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Our Mission
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              To empower home cooks with the finest ingredients and chef-crafted 
              recipes, making gourmet cooking accessible to everyone.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our Chefs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team of culinary experts crafts each recipe with passion and precision
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {chefs.map((chef, index) => (
                <motion.div
                  key={chef.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={chef.image}
                        alt={chef.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="mb-2">{chef.specialty}</Badge>
                        <h3 className="font-serif text-xl font-bold text-white">
                          {chef.name}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {chef.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Our Hotel Background
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GustoKart's roots trace back to our founders' experience running 
                award-winning hotels and restaurants. For over two decades, we 
                served discerning guests who expected nothing but the best.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Now, we bring that same commitment to excellence directly to your 
                home. Every recipe you find on GustoKart has been tested and 
                perfected in professional kitchens before being adapted for home cooks.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {values.map((value) => (
                  <div key={value.title} className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
                  alt="Fine dining restaurant"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border">
                <p className="font-serif text-4xl font-bold text-primary">20+</p>
                <p className="text-muted-foreground">Years of Experience</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              The GustoKart Guarantee
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-accent-foreground/80 max-w-2xl mx-auto mb-12"
            >
              We stand behind every ingredient and recipe we offer
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-accent-foreground mb-2">
                  100% Fresh
                </h3>
                <p className="text-accent-foreground/70 text-sm">
                  All ingredients are fresh and never frozen
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-accent-foreground mb-2">
                  Quality Certified
                </h3>
                <p className="text-accent-foreground/70 text-sm">
                  Every product meets strict quality standards
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-accent-foreground mb-2">
                  Satisfaction Guaranteed
                </h3>
                <p className="text-accent-foreground/70 text-sm">
                  Not happy? Full refund, no questions asked
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
