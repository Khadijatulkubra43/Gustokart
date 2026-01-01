import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, HelpCircle, User, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: <HelpCircle className="w-4 h-4" /> },
    { value: "order", label: "Order Issue", icon: <ShoppingBag className="w-4 h-4" /> },
    { value: "feedback", label: "Feedback", icon: <Star className="w-4 h-4" /> },
    { value: "business", label: "Business Inquiry", icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general"
    });
    
    // Reset submission status after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-secondary/5 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about ingredients, orders, or recipes? Our team is here to help you cook better every day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Send className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary">Send us a Message</h2>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name *</label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John" 
                      className="bg-gray-50 border-gray-200 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name *</label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe" 
                      className="bg-gray-50 border-gray-200 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email *</label>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      className="bg-gray-50 border-gray-200 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <Input 
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567" 
                      className="bg-gray-50 border-gray-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Inquiry Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.value }))}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                          formData.inquiryType === type.value 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {type.icon}
                        <span className="text-sm">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <Input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?" 
                    className="bg-gray-50 border-gray-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message *</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you today?" 
                    className="min-h-[150px] bg-gray-50 border-gray-200 focus:border-primary"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & FAQ */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Information Card */}
            <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent opacity-10 rounded-full -translate-y-1/4 translate-x-1/4" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold">Contact Information</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <Phone className="w-5 h-5" />,
                      title: "Phone",
                      content: "+1 (555) 123-4567",
                      subtext: "Mon-Fri 9am to 6pm"
                    },
                    {
                      icon: <Mail className="w-5 h-5" />,
                      title: "Email",
                      content: "hello@gustokart.com",
                      subtext: "Typically reply within 24 hours"
                    },
                    {
                      icon: <MapPin className="w-5 h-5" />,
                      title: "Location",
                      content: "123 Culinary Avenue, Foodie District, FD 90210",
                      subtext: "Visit our warehouse"
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      title: "Customer Support Hours",
                      content: "Daily: 8:00 AM - 10:00 PM",
                      subtext: "Extended hours for your convenience"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-3 bg-white/10 rounded-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-accent flex items-center gap-2">
                          {item.title}
                        </p>
                        <p className="text-gray-100 mt-1">{item.content}</p>
                        {item.subtext && (
                          <p className="text-sm text-gray-300 mt-1">{item.subtext}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
              <h4 className="text-xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Quick Questions
              </h4>
              <div className="space-y-4">
                {[
                  {
                    q: "What's your delivery radius?",
                    a: "We deliver within 20 miles of our warehouse. Check your zip code during checkout."
                  },
                  {
                    q: "Can I modify my order?",
                    a: "Yes, you can modify orders within 1 hour of placing them through your account."
                  },
                  {
                    q: "Do you offer bulk discounts?",
                    a: "Contact our business team for custom quotes on bulk ingredient orders."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                    <p className="font-medium text-gray-800">{faq.q}</p>
                    <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social & Map */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Social Media Links */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
                <h4 className="text-xl font-serif font-bold text-primary mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {["Instagram", "Facebook", "Twitter", "LinkedIn"].map((platform) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="flex-1 border-gray-200 hover:border-primary hover:bg-primary/5"
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-primary mb-2">Our Location</h4>
                <p className="text-gray-600 text-sm mb-4">Visit our warehouse for bulk orders</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-primary">Fast Response Guarantee</p>
                  <p className="text-sm text-gray-600">We respond to all inquiries within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}