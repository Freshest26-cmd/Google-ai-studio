export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Elite Series Ball",
    price: 129.99,
    description: "Premium composite leather for ultimate grip and control. Designed for professional indoor play with moisture-wicking technology.",
    image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1000&auto=format&fit=crop",
    category: "Professional",
    rating: 4.8,
    reviewsCount: 124,
    stock: 15
  },
  {
    id: "2",
    name: "Street King",
    price: 89.99,
    description: "Durable rubber construction for outdoor dominance. Extra-deep channels for better grip on rough asphalt surfaces.",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1000&auto=format&fit=crop",
    category: "Outdoor",
    rating: 4.5,
    reviewsCount: 89,
    stock: 42
  },
  {
    id: "3",
    name: "Aero-Grip Pro",
    price: 149.99,
    description: "Advanced aerodynamics for consistent flight and arc. Features a unique micro-pebble surface for maximum tactile feel.",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1000&auto=format&fit=crop",
    category: "Professional",
    rating: 4.9,
    reviewsCount: 56,
    stock: 8
  },
  {
    id: "4",
    name: "Neon Pulse",
    price: 110.00,
    description: "High-visibility design for low-light performance. Glow-in-the-dark accents make it perfect for late-night court sessions.",
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1000&auto=format&fit=crop",
    category: "Special Edition",
    rating: 4.7,
    reviewsCount: 34,
    stock: 21
  },
  {
    id: "5",
    name: "Velocity Sneakers",
    price: 189.99,
    description: "Ultra-lightweight basketball shoes with responsive cushioning. Designed for explosive speed and quick cuts on the court.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    category: "Footwear",
    rating: 4.9,
    reviewsCount: 215,
    stock: 12
  },
  {
    id: "6",
    name: "Pro Sonic Headphones",
    price: 249.99,
    description: "Noise-canceling headphones for pre-game focus. Crystal clear sound with deep bass to get you in the zone.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.8,
    reviewsCount: 156,
    stock: 25
  },
  {
    id: "7",
    name: "Stealth Backpack",
    price: 75.00,
    description: "Spacious and durable backpack with a dedicated ball compartment. Perfect for carrying all your gear to the court.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.6,
    reviewsCount: 78,
    stock: 30
  }
];
