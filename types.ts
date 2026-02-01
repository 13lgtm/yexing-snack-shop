
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: string;
  image: string;
  tag?: string;
  rating: number;
  reviews: string;
  time: string;
  calories: string;
  ingredients: { emoji: string; name: string }[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'cooking' | 'completed' | 'cancelled';
  orderNo: string;
}
