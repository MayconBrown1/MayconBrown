export interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  saleType: 'quantity' | 'weight';
  imageUrl?: string;
  category?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  document: string; // CPF/CNPJ
  phone?: string;
  email?: string;
}

export type PaymentMethod = 'cash' | 'credit' | 'debit' | 'pix' | 'boleto';

export interface Order {
  id: string;
  items: CartItem[];
  customer: Customer | null;
  total: number;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  change: number;
  date: Date;
  synced: boolean;
}