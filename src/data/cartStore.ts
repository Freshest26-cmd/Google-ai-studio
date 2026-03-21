import { Product } from "./products";

export interface CartItem extends Product {
  quantity: number;
}

class CartStore {
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
    window.dispatchEvent(new CustomEvent("cart-updated"));
  }

  addItem(product: Product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.notify();
  }

  removeItem(productId: string) {
    this.items = this.items.filter(item => item.id !== productId);
    this.notify();
  }

  getItems() {
    return [...this.items];
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

export const cartStore = new CartStore();
