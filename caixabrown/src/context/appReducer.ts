import { Product, CartItem, Customer, Order } from '../types';

export interface AppState {
  products: Product[];
  cart: CartItem[];
  customers: Customer[];
  orders: Order[];
  currentCustomer: Customer | null;
}

export const initialState: AppState = {
  products: [],
  cart: [],
  customers: [],
  orders: [],
  currentCustomer: null
};

export type AppAction =
  | { type: 'ADD_PRODUCT'; payload: { product: Product } }
  | { type: 'UPDATE_PRODUCT'; payload: { product: Product } }
  | { type: 'DELETE_PRODUCT'; payload: { productId: string } }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_CART_ITEM_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_CUSTOMER'; payload: { customer: Customer } }
  | { type: 'UPDATE_CUSTOMER'; payload: { customer: Customer } }
  | { type: 'DELETE_CUSTOMER'; payload: { customerId: string } }
  | { type: 'SET_CURRENT_CUSTOMER'; payload: { customer: Customer | null } }
  | { type: 'ADD_ORDER'; payload: { order: Order } }
  | { type: 'MARK_ORDERS_SYNCED' };

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload.product]
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.product.id ? action.payload.product : product
        )
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.productId)
      };
    
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product, quantity }]
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload.productId)
      };
    
    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.product.id === action.payload.productId 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };
    
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.payload.customer]
      };
    
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(customer => 
          customer.id === action.payload.customer.id ? action.payload.customer : customer
        )
      };
    
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload.customerId)
      };
    
    case 'SET_CURRENT_CUSTOMER':
      return {
        ...state,
        currentCustomer: action.payload.customer
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload.order]
      };
    
    case 'MARK_ORDERS_SYNCED':
      return {
        ...state,
        orders: state.orders.map(order => ({ ...order, synced: true }))
      };
    
    default:
      return state;
  }
};