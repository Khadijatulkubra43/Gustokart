import { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Menu, X, Sun, Moon, Search, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";
import { useAuth } from "@/lib/auth-context";
import { searchRecipes } from "@/lib/recipes-data";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchRecipes>>([]);
  const [showSearch, setShowSearch] = useState(false);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isGuest, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchRecipes(searchQuery).slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleSearchSelect = (recipeId: string) => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
    setLocation(`/recipe/${recipeId}`);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" data-testid="link-home-logo">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold text-xl">G</span>
              </div>
              <img src="../../public/logo.png"
               alt="GustoKart Logo"
                width={120}
                 height={40} 
                 className="hidden sm:block" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`font-medium transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative"
                  >
                    <Input
                      type="search"
                      placeholder="Search recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-8"
                      data-testid="input-search"
                      autoFocus
                    />
                    {searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
                        {searchResults.map((recipe) => (
                          <button
                            key={recipe.id}
                            onClick={() => handleSearchSelect(recipe.id)}
                            className="w-full px-4 py-3 text-left hover-elevate flex items-center gap-3 border-b border-border last:border-0"
                            data-testid={`search-result-${recipe.id}`}
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="w-10 h-10 rounded-md object-cover"
                            />
                            <div>
                              <p className="font-medium text-foreground text-sm">{recipe.name}</p>
                              <p className="text-xs text-muted-foreground">{recipe.category}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowSearch(!showSearch)}
                data-testid="button-toggle-search"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Link href="/cart">
              <Button
                size="icon"
                variant="ghost"
                className="relative"
                data-testid="button-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge
                      variant="default"
                      className="min-w-5 h-5 flex items-center justify-center p-0 text-xs"
                    >
                      {itemCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" data-testid="button-user-menu">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer" data-testid="link-dashboard">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive" data-testid="button-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button size="icon" variant="ghost" data-testid="button-user">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              <div className="relative mb-4">
                <Input
                  type="search"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  data-testid="input-search-mobile"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
                    {searchResults.map((recipe) => (
                      <button
                        key={recipe.id}
                        onClick={() => {
                          handleSearchSelect(recipe.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover-elevate flex items-center gap-3 border-b border-border last:border-0"
                        data-testid={`search-result-mobile-${recipe.id}`}
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground text-sm">{recipe.name}</p>
                          <p className="text-xs text-muted-foreground">{recipe.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={location === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-nav-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
