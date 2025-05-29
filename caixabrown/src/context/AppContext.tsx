import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, Customer, PaymentMethod, Order } from '../types';
import { appReducer, initialState, AppState, AppAction } from './appReducer';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  processPayment: (method: PaymentMethod, amountPaid: number) => void;
  generateReceipt: () => void;
  syncData: () => Promise<void>;
  isOnline: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    const savedState = loadFromStorage('appState');
    return savedState || initialState;
  });

  const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);

  useEffect(() => {
    saveToStorage('appState', state);
  }, [state]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const processPayment = (method: PaymentMethod, amountPaid: number) => {
    const total = calculateTotal();
    const change = method === 'cash' ? amountPaid - total : 0;
    
    const order: Order = {
      id: Date.now().toString(),
      items: [...state.cart],
      customer: state.currentCustomer,
      total,
      paymentMethod: method,
      amountPaid,
      change,
      date: new Date(),
      synced: false
    };

    dispatch({ type: 'ADD_ORDER', payload: { order } });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'SET_CURRENT_CUSTOMER', payload: { customer: null } });
  };

  const generateReceipt = () => {
    // Implementation for generating and printing receipt would go here
    console.log('Generating receipt...');
  };

  const syncData = async () => {
    if (!isOnline) return;

    try {
      // Mock API call to sync data
      console.log('Syncing data with server...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark orders as synced
      dispatch({ type: 'MARK_ORDERS_SYNCED' });
      
      console.log('Data synced successfully');
    } catch (error) {
      console.error('Failed to sync data:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        calculateTotal,
        processPayment,
        generateReceipt,
        syncData,
        isOnline
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};