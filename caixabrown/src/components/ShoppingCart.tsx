import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';

const ShoppingCart: React.FC = () => {
  const { state, removeFromCart, updateCartItemQuantity, calculateTotal } = useAppContext();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      if (window.confirm('Remover item do carrinho?')) {
        removeFromCart(productId);
      }
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleIncreaseQuantity = (productId: string, currentQuantity: number) => {
    updateCartItemQuantity(productId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateCartItemQuantity(productId, currentQuantity - 1);
    } else {
      if (window.confirm('Remover item do carrinho?')) {
        removeFromCart(productId);
      }
    }
  };

  const total = calculateTotal();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Carrinho de Compras</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {state.cart.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>O carrinho está vazio</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {state.cart.map((item) => (
              <li key={item.product.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {formatCurrency(item.product.price)} / {item.product.saleType === 'weight' ? 'kg' : 'un'}
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleDecreaseQuantity(item.product.id, item.quantity)}
                    >
                      <MinusCircle size={20} />
                    </button>
                    
                    {editingItemId === item.product.id ? (
                      <input
                        type="number"
                        min="1"
                        step={item.product.saleType === 'weight' ? '0.1' : '1'}
                        className="w-16 p-1 text-center border border-gray-300 rounded"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(
                          item.product.id, 
                          parseFloat(e.target.value) || 0
                        )}
                        onBlur={() => setEditingItemId(null)}
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="cursor-pointer px-2"
                        onClick={() => setEditingItemId(item.product.id)}
                      >
                        {item.quantity} {item.product.saleType === 'weight' ? 'kg' : 'un'}
                      </span>
                    )}
                    
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleIncreaseQuantity(item.product.id, item.quantity)}
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>
                  
                  <span className="font-medium">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          <p>{state.cart.length} {state.cart.length === 1 ? 'item' : 'itens'} no carrinho</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;