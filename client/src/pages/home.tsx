import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Star,
  Clock,
  Flame,
  CheckCircle,
  Truck,
  Shield,
  Leaf,
  Mail,
  Clock as ClockIcon,
  ChefHat,
  Award,
  Users,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recipes, heroImage } from "@/lib/data";
import { useState, useRef } from "react";
import hero from "../../public/hero.png";
import about from "../../public/about.png";
import Recipes from "../pages/recipe";
import image1 from "../../public/p1.png"
import image2 from "../../public/p2.png"
import image3 from "../../public/p3.png"
import image4 from "../../public/p4.png"

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Floating animation for decorative elements
const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Scale in animation
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "backOut" }
  }
};

// Slide in from left/right
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Parallax scroll effect
function ParallaxSection({ children, speed = 0.5, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const containerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    alert("Thanks for subscribing! We'll notify you when we launch.");
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section with enhanced animations */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Delicious Food Spread"
            className="w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60"
          />
        </div>

        {/* Floating decorative elements */}
        <motion.div
          animate={floatAnimation}
          className="absolute top-20 left-10 w-24 h-24 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Flame className="w-4 h-4 text-accent" />
              </motion.div>
              <span className="text-sm font-medium">
                Coming Soon to Your City
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-6xl font-serif font-bold leading-tight mb-6"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
               Your kitchen start with
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-accent block"
              >
                Kusto-Cart
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-100 mb-10 max-w-xl leading-relaxed"
            >
              Where fresh ingredients meet smart cooking. Meal kits designed for
              modern Pakistani kitchens.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-center md:items-start"
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white border-none rounded-full px-10 h-14 text-lg shadow-lg shadow-accent/30 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                Get Early Access
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-12 flex flex-wrap gap-6 justify-center md:justify-start"
            >
              {["No Minimum Order", "30-Minute Guarantee"].map((text, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ArrowRight className="w-6 h-6 text-white rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* About GustoKart Section with parallax */}
      <ParallaxSection speed={0.3}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={slideInLeft}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={about}
                    alt="About GustoKart"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl max-w-xs"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {/* <div className="p-3 bg-accent/10 rounded-full">
                      <Award className="w-6 h-6 text-accent" />
                    </div> */}
                    {/* <div>
                      <motion.p
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className="text-3xl font-bold text-primary"
                      >
                        500+
                      </motion.p>
                      <p className="text-sm text-gray-500">Happy Customers</p>
                    </div> */}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={slideInRight}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-accent font-bold text-sm uppercase tracking-widest"
                >
                  About Us
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-serif font-bold text-primary mt-2 mb-6"
                >
                  Welcome to <span className="text-accent">GustoKart</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 mb-6"
                >
                  Gusto Kart is redefining home cooking in Pakistan by making it
                  simpler, smarter, and waste-free. We're a meal-kit ingredient
                  delivery service built for modern lifestyles — where time is
                  limited, choices are endless, and food should always feel
                  exciting, not exhausting.
                </motion.p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: Leaf, text: "100% organic and locally sourced ingredients" },
                    { icon: Truck, text: "Eco-friendly packaging and delivery" },
                    { icon: Shield, text: "Quality guaranteed or your money back" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 bg-accent/10 rounded-lg"
                      >
                        <item.icon className="w-5 h-5 text-accent" />
                      </motion.div>
                      <span className="text-gray-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/about" className="block">
                    <Button className="rounded-full px-8 h-12">
                      Learn More About Us
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* How It Works Section with staggered animations */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent font-bold text-sm uppercase tracking-widest">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mt-2">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              From Menu to Meal — in 3 Simple Steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Animated connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent origin-left"
            />

            {[
              {
                step: "01",
                icon: "📋",
                title: "Choose Your Meal",
                desc: "Browse our curated menu of delicious, home-style and modern recipes. Each meal is carefully designed to be easy to cook, full of flavor, and perfectly portioned.",
              },
              {
                step: "02",
                icon: "📦",
                title: "Get Pre-Portioned Ingredients",
                desc: "Once you select a meal, we deliver fresh, pre-measured ingredients straight to your door — cleaned, sorted, and beautifully packed.",
              },
              {
                step: "03",
                icon: "👨‍🍳",
                title: "Cook with Confidence",
                desc: "Access your step-by-step digital recipe on our website — complete with photos, cooking tips, and exact timings.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.2, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="relative bg-white p-8 rounded-2xl shadow-sm text-center border border-border/50 hover:shadow-xl transition-shadow"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-accent to-accent/80 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg"
                >
                  {step.step}
                </motion.div>
                <motion.div
                  animate={floatAnimation}
                  className="text-5xl mb-6 mt-4"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <Recipes />

      {/* Ingredient Quality Section with gradient animations */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-accent font-bold text-sm uppercase tracking-widest"
              >
                Our Promise
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6"
              >
                Farm to <span className="text-accent">Table</span> Quality
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg text-gray-200 mb-8"
              >
                We partner with local farmers and suppliers who share our
                commitment to sustainability and quality. Every ingredient is
                carefully selected and inspected.
              </motion.p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {[
                  { percent: "100%", label: "Organic Produce" },
                  { percent: "0%", label: "Artificial Additives" },
                  { percent: "24h", label: "From Farm to Kitchen" },
                  { percent: "50+", label: "Local Partners" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <motion.p
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl font-bold mb-2"
                    >
                      {stat.percent}
                    </motion.p>
                    <p className="text-gray-200">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={slideInRight}
              className="grid grid-cols-2 gap-4"
            >
              {[
                image1,
                image2,
                image3,
                image4,
              ].map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                  className={`aspect-square rounded-2xl overflow-hidden shadow-2xl ${
                    idx === 0 ? "mt-8" : idx === 3 ? "-mt-8" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt="Ingredients"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coming Soon & Email Signup with pulse animation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent/10 to-primary/10 p-12 rounded-3xl border border-accent/20 relative overflow-hidden"
            >
              {/* Animated background */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                style={{ backgroundSize: "200% 200%" }}
              />

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 relative z-10"
              >
                <ClockIcon className="w-4 h-4" />
                <span className="font-bold text-sm">COMING SOON</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 relative z-10"
              >
                Launching Soon!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto relative z-10"
              >
                Be the first to experience GustoKart in your area. Sign up for
                early access and exclusive launch offers.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto relative z-10"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-full border-border bg-white shadow-lg"
                      required
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="rounded-full h-12 px-8 whitespace-nowrap bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                    >
                      <Mail className="mr-2 w-4 h-4" />
                      Notify Me
                    </Button>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  By subscribing, you agree to our Privacy Policy. We'll send
                  you updates about our launch.
                </p>
              </motion.form>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-12 flex flex-wrap justify-center gap-8 relative z-10"
              >
                {[
                  { value: "Easy", label: "Home Recipes" },
                  { value: "Healthy", label: "Meal Ideas" },
                  { value: "Quick", label: "Cooking Tips" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="text-center"
                  >
                    <motion.p
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      className="text-2xl font-bold text-primary"
                    >
                      {item.value}
                    </motion.p>
                    <p className="text-gray-500">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-accent/5 to-primary/5 blur-3xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}